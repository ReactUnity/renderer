export type DiffResult = null | Record<string, any>;

export const styleStringSymbol = '__style_as_string__';

export function diffProperties(
  lastProps: Record<string, any>,
  nextProps: Record<string, any>,
  deepDiffing = 0,
): DiffResult {
  if (lastProps === nextProps) return null;
  let updatePayload: DiffResult = null;

  let propKey;
  for (propKey in lastProps) {
    // This loop is for removing properties that existed in the previous properties, but not on current

    if (
      nextProps.hasOwnProperty(propKey)
      || !lastProps.hasOwnProperty(propKey)
      || lastProps[propKey] == null
    ) {
      continue;
    }

    let prop = null;

    // If style existed in the previous properties as string, set it to null
    if (propKey === 'style' && typeof lastProps.style === 'string') {
      (updatePayload = updatePayload || {})[styleStringSymbol] = null;
    }
    else {
      const depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;
      if (depth > 0) {
        prop = diffProperties(lastProps[propKey], {}, depth - 1);
        if (!prop) continue;
      }

      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      (updatePayload = updatePayload || {})[propKey] = prop;
    }
  }

  for (propKey in nextProps) {
    // This loop is for finding difference between current properties and previous properties

    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (
      !nextProps.hasOwnProperty(propKey)
      || nextProp === lastProp
      || (nextProp == null && lastProp == null)
    ) {
      continue;
    }

    let prop = nextProp;

    if (propKey === 'style') {
      const prevWasString = (typeof lastProp === 'string');
      const curIsString = (typeof prop === 'string');

      if (prevWasString !== curIsString) {
        (updatePayload = updatePayload || {})[styleStringSymbol] = typeof prop === 'string' ? prop : null;

        if (curIsString) {
          // Current style is string while previous is object, so revert all changes from the previous one
          prop = diffProperties(lastProp, {}, 0);
          if (!prop) continue;
        }
      } else {
        if (curIsString) {
          // Both styles are string, style does not need changing
          continue;
        }
        else {
          // Both styles are object, take the difference
          prop = diffProperties(lastProp, nextProp, 0);
          if (!prop) continue;
        }
      }
    }

    if (deepDiffing > 0) {
      prop = diffProperties(lastProp, nextProp, deepDiffing - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || {})[propKey] = prop;
  }

  return updatePayload;
}
