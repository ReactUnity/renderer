
import { Array2Aux, Array4Aux, PositioningLiteral } from './values';
import { Direction, Display, FlexDirection, Overflow, Position, Wrap, YogaAlign, YogaJustify } from './yoga-enums';


// boolean, null and undefined are all mapped to undefined
// pt, px and no unit is mapped to Point unit, e.g. 50px -> 50 Points
// % is mapped to percentage, e.g. 50% -> 50 Percent
export type YogaValueAux = 'auto' | number | null | undefined | boolean | (string & {});
export type YogaValue2Aux = Array2Aux<YogaValueAux> | PositioningLiteral;
export type YogaValue4Aux = Array4Aux<YogaValueAux>;


export interface Layout {
  overflow?: Overflow;
  styleDirection?: Direction;
  display?: Display;
  wrap?: Wrap;
  positionType?: Position;
  justifyContent?: YogaJustify;
  alignContent?: YogaAlign;
  alignSelf?: YogaAlign;
  alignItems?: YogaAlign;
  borderWidth?: number;
  borderStartWidth?: number;
  borderEndWidth?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  aspectRatio?: number;
  flexDirection?: FlexDirection;
  flexShrink?: number;
  flexGrow?: number;
  flexBasis?: YogaValueAux;
  minHeight?: YogaValueAux;
  minWidth?: YogaValueAux;
  maxHeight?: YogaValueAux;
  maxWidth?: YogaValueAux;
  height?: YogaValueAux;
  width?: YogaValueAux;
  left?: YogaValueAux;
  top?: YogaValueAux;
  right?: YogaValueAux;
  start?: YogaValueAux;
  end?: YogaValueAux;
  marginLeft?: YogaValueAux;
  marginTop?: YogaValueAux;
  marginRight?: YogaValueAux;
  marginBottom?: YogaValueAux;
  marginStart?: YogaValueAux;
  marginEnd?: YogaValueAux;
  marginHorizontal?: YogaValueAux;
  bottom?: YogaValueAux;
  margin?: YogaValueAux;
  marginVertical?: YogaValueAux;
  padding?: YogaValueAux;
  paddingVertical?: YogaValueAux;
  paddingHorizontal?: YogaValueAux;
  paddingStart?: YogaValueAux;
  paddingBottom?: YogaValueAux;
  paddingRight?: YogaValueAux;
  paddingTop?: YogaValueAux;
  paddingEnd?: YogaValueAux;
  paddingLeft?: YogaValueAux;
  rowGap?: number;
  columnGap?: number;
}

export interface LayoutExtended {
  position?: Position;
  direction?: Direction;
  flexWrap?: Wrap;
}

export type LayoutCssCompatible = Omit<Layout, 'styleDirection' | 'position' | 'wrap' | 'margin' | 'padding' | 'borderWidth'> & LayoutExtended;
