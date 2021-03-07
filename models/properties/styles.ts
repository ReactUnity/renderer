import { FontWeight, FontStyles, TextOverflowModes, CursorType, PointerEvents, Visibility, Appearance, WhiteSpace, NavigationMode } from './styles-enums';
import { YogaValue2Aux, YogaValueAux } from './yoga';
import { ColorAux } from './values';
import { UnityObject } from '../context';
import { Vector2Aux } from './values';
import { EnumOrLiteral, AssetReference } from './values';

export interface RenderStyle {
  opacity?: number;
  zIndex?: number;
  visibility?: EnumOrLiteral<typeof Visibility> | boolean;
  cursor?: EnumOrLiteral<typeof CursorType> | string;
  pointerEvents?: EnumOrLiteral<typeof PointerEvents>;
  content?: string;
  appearance?: EnumOrLiteral<typeof Appearance>;
  navigation?: EnumOrLiteral<typeof NavigationMode>;

  backgroundColor?: ColorAux;
  backgroundImage?: AssetReference;
  borderRadius?: number;
  borderColor?: ColorAux;
  boxShadow?: string;

  transformOrigin?: Vector2Aux;
  translate?: YogaValue2Aux;
  scale?: Vector2Aux;
  rotate?: number;

  // Inherited styles
  font?: UnityObject;
  fontFamily?: AssetReference;
  color?: ColorAux;
  fontWeight?: EnumOrLiteral<typeof FontWeight>;
  fontStyle?: EnumOrLiteral<typeof FontStyles>;
  fontSize?: YogaValueAux;
  textOverflow?: EnumOrLiteral<typeof TextOverflowModes>;
  whiteSpace?: EnumOrLiteral<typeof WhiteSpace>;
}