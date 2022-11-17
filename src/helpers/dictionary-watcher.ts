import { createContext, createElement, useContext } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { ReactUnity } from '../models/generated';

function shallowEquals (a, b) {
  if (a === b) return true;
  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  var keys = Object.keys(a);
  var length = keys.length;

  for (var i = 0; i < length; i++)
    if (!(keys[i] in b)) return false;

  for (var i = 0; i < length; i++)
    if (a[keys[i]] !== b[keys[i]]) return false;

  return length === Object.keys(b).length;
};

export interface DictionaryWatcher<T = Record<string, any>> {
  /** React Context that provides the value */
  context: React.Context<T>;

  /**
   * The provider component that should be used to wrap the components where this context will be used
   *
   * Usage:
   *
   * ```tsx
   * <watcher.Provider>
   *   <App />
   * </watcher.Provider>
   * ```
   */
  Provider: (props: { children?: React.ReactNode }) => React.FunctionComponentElement<React.ProviderProps<T>>;

  /**
   * React Hook for getting the value from Context
   *
   *  Usage:
   *
   * ```tsx
   * function App() {
   *   const values = watcher.useContext();
   *   ...
   * }
   * ```
   */
  useContext: () => T;

  /**
   * React Hook for getting a partial value from Context
   *
   *  Usage:
   *
   * ```tsx
   * function App() {
   *   const values = watcher.useSelector(st => st.count);
   *   ...
   * }
   * ```
   */
  useSelector<Res>(selector: (store: T) => Res): Res
}

/**
 * Creates a context that updates its value when the values in the dictionary change
 * @param dictionary The dictionary to be watched. Must implement the EventDictionary type in the C#
 * @param displayName A displayName to identify this context easier in case of problems
 */
export function createDictionaryWatcher<ValueType = any, RecordType = Record<string, ValueType>>
  (dictionary: ReactUnity.Helpers.WatchableRecord<ValueType>, displayName?: string): DictionaryWatcher<RecordType> {
  const ctx = createContext<RecordType>(undefined);
  if (displayName) ctx.displayName = displayName;

  let snapshot: RecordType = ({ ...dictionary }) as any;

  const subscribe = (onStoreChange: () => void) => {
    snapshot = ({ ...dictionary }) as any;

    const remove = dictionary?.AddListener((key, value, dic) => {
      snapshot = ({ ...dictionary }) as any;
      onStoreChange();
    });

    if (!remove) {
      if (displayName) console.warn(`${displayName} dictionary does not provide a change listener`);
      else console.warn('The dictionary does not provide a change listener');
    }

    return () => remove?.();
  };

  const getSnapshot = () => snapshot;

  const Provider = function GlobalsProvider({ children }: { children?: React.ReactNode }) {
    const value: any = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    return createElement(ctx.Provider, { value }, children);
  };

  function useSelector<Res>(selector: (store: RecordType) => Res) {
    return useSyncExternalStoreWithSelector(subscribe, getSnapshot, getSnapshot, selector, shallowEquals);
  }

  function useDictionaryContext() {
    const context = useContext(ctx);
    if (context === undefined) {
      if (displayName) throw new Error(`${displayName}.useContext must be used within a ${displayName}.Provider`);
      else throw new Error('useContext must be used within a provider');
    }
    return context;
  }

  return { context: ctx, Provider, useContext: useDictionaryContext, useSelector };
}

export const globalsWatcher = createDictionaryWatcher<any, DefaultGlobals>(Globals, 'globalsContext');
export const useGlobals = globalsWatcher.useContext;
export const useSelector = globalsWatcher.useSelector;
export const GlobalsProvider = globalsWatcher.Provider;
