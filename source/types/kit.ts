import type {
  IAttributes,
  IAttributesScope,
  IWidget,
  IWidgetElements,
  IWidgetSignalableMap
} from "@protorians/widgets";
import type {IProperty, IPropertyScheme} from "@protorians/core";

export type KitMain<Attributes> = (parameters: Attributes) => KitWidget;

export type KitSchematic<Attributes> = {
  tag?: string;
  identifier: string;
  main: KitMain<Attributes>;
}

export type KitEvents<T> = {
  [K in keyof T]: KitEventCallback<T[K]>
}

export type KitEventCallback<T> = (payload: T) => void;

export type KitWidget = Partial<IAttributesScope<IAttributes, HTMLElement>>

export type IKitSignalableMap = IWidgetSignalableMap<IAttributes, IWidgetElements>

export type IKitCallbackPayload<Attributes> = Attributes & {
  kit: IWidget<IAttributes, HTMLElement>
}

export type IKitAttribuable = {
  [K in keyof IAttributes]: IAttributes[K]
}

export type IKitEntries = {
  [K: string]: KitSchematic<any> | undefined;
}

export type IKitChildren<P extends IPropertyScheme> = {
  [K in keyof P]: ICapabilityCallback<P[K], P>
}

export type ICapabilityWidget = IWidget<IAttributes, HTMLElement>;

export type ICapabilityPayload<P, Props extends IPropertyScheme> = {
  value: P;
  initial: P;
  old: P;
  widget: IWidget<any, any>;
  props: Props;
}

export type ICapabilityCallback<P, Props extends IPropertyScheme> = (payload: ICapabilityPayload<P, Props>) => void;

export type ICapabilityProps<P extends IPropertyScheme, Ability extends ICapabilityKit<P>> = {
  capability?: (capability: Ability) => Ability
}

export interface ICapabilityKit<P extends IPropertyScheme> {
  property: IProperty<P>;

  initialize(): void;

  bind(index: keyof P, widget: ICapabilityWidget): this;

  set<K extends keyof P>(index: K, value: P[K]): this;

  get<K extends keyof P>(index: K, fallback?: P[K]): P[K];

  increment<K extends keyof P>(index: K, add: number): this;

  decrement<K extends keyof P>(index: K, subtract: number): this;
}

export interface IKit extends IWidget<IAttributes, HTMLElement> {

}
