import { Style } from './styles';
import { Layout } from './yoga';
import { Events, ActionCallback } from './events';
import { AssetReference } from '../values/asset-reference';
import { UnityObject } from '../native/context';
import { Color } from '../values/color';

export interface StateStyles {
  hover?: Style;
  // focus?: Style;
  // active?: Style;
  // [key: string]: Style;
}

export interface StyleAndLayout {
  layout?: Layout;
  style?: Style;
  stateStyles?: StateStyles;
}

export interface View extends Events, StyleAndLayout {
  name?: string;
}

export interface Button extends View {
  onClick?: ActionCallback;
}

export interface Image extends View {
  source?: AssetReference | UnityObject;
  fit?: number;
  tint?: Color;
}


export type ToggleEvent = (val: boolean) => void;

export interface Toggle extends View {
  onChange?: ToggleEvent;

  value?: boolean;
}
