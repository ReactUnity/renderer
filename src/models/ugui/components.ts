import { BaseCmpProps, ContentSrcProps } from '../base';
import { ReactUnity, UnityEngine } from '../generated';
import { AnchorTarget, ScrollDirection } from '../properties';
import { AssetReference, AssetReferenceOrHttp } from '../properties/values';
import { ActionCallback, Events } from './events';

export interface View<T = ReactUnity.UGUI.UGUIComponent> extends Events<T>, BaseCmpProps {
  active?: boolean;
  eventViewport?: UnityEngine.RectTransform | UnityEngine.GameObject | ReactUnity.UGUI.UGUIComponent;
}

export interface Text extends View<ReactUnity.UGUI.TextComponent> {
  richText?: boolean;
}

export interface Label extends View<ReactUnity.UGUI.LabelComponent> {
  for?: ReactUnity.UGUI.UGUIComponent | string;
}

export interface Icon extends View<ReactUnity.UGUI.IconComponent> {
  set?: ReactUnity.Styling.IconSet | string;
}

export interface Scroll extends View<ReactUnity.UGUI.ScrollComponent> {
  onValueChanged?: (ev: UnityEngine.Vector2, sender: ReactUnity.UGUI.ScrollComponent) => void;
  direction?: ScrollDirection;
  alwaysShow?: ScrollDirection;
  sensitivity?: number;
  elasticity?: number;
  smoothness?: number;
}

export interface Button extends Omit<View<ReactUnity.UGUI.ButtonComponent>, 'onClick'> {
  onClick?: ActionCallback<ReactUnity.UGUI.ButtonComponent>;
  disabled?: boolean;
}

export interface Toggle extends View<ReactUnity.UGUI.ToggleComponent> {
  value?: any;
  checked?: boolean;
  onChange?: (val: boolean, sender: ReactUnity.UGUI.ToggleComponent) => void;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface Anchor extends View<ReactUnity.UGUI.AnchorComponent> {
  url?: string;
  href?: string;
  disabled?: boolean;
  /** Works in WebGL only */
  target?: AnchorTarget;
}

export interface BaseImage<T = ReactUnity.UGUI.ImageComponent> extends View<T> {
  src?: AssetReferenceOrHttp;
  source?: AssetReferenceOrHttp;
  alt?: string;
}

export interface Image<T = ReactUnity.UGUI.ImageComponent> extends BaseImage<T> {
  preserveAspect?: boolean;
}

export interface RawImage extends BaseImage<ReactUnity.UGUI.RawImageComponent> {}
export interface Video extends BaseImage<ReactUnity.UGUI.VideoComponent> {
  src?: AssetReference;
  source?: AssetReference;
}
export interface SvgImage<T = ReactUnity.UGUI.SvgImageComponent> extends Image<T> {}

export interface Render<T = ReactUnity.UGUI.RenderComponent> extends BaseImage<T> {
  width: number;
  height: number;
  src?: never;
  source?: never;
  camera?: UnityEngine.Camera | UnityEngine.GameObject;
  onMount?: (camera: UnityEngine.Camera, sender: T) => void;
  onUnmount?: (camera: UnityEngine.Camera, sender: T) => void;
}

export interface Object extends Render<ReactUnity.UGUI.ObjectComponent> {
  target?: UnityEngine.GameObject;
}

export interface Prefab<T = ReactUnity.UGUI.PrefabComponent> extends View<T> {
  target?: UnityEngine.GameObject | UnityEngine.Component;
  onMount?: (camera: UnityEngine.GameObject, sender: T) => void;
  onUnmount?: (camera: UnityEngine.GameObject, sender: T) => void;
}

export interface Portal<T = ReactUnity.UGUI.PortalComponent> extends View<T> {
  target?: UnityEngine.GameObject | UnityEngine.Component | UnityEngine.Transform | ReactUnity.UGUI.UGUIComponent;
  eventCamera?: UnityEngine.Camera | UnityEngine.GameObject;
  onMount?: (camera: UnityEngine.Transform, sender: T) => void;
  onUnmount?: (camera: UnityEngine.Transform, sender: T) => void;
}

export interface Svg<T = ReactUnity.UGUI.SvgComponent> extends SvgImage<T>, ContentSrcProps {}
