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

export interface IKit extends IWidget<IAttributes, HTMLElement> {

}

export type IKitAbilityPayload<P> = {
  value: P;
  widget: IWidget<any, any>;
}

export type IKitAbility = IWidget<any, any>;

export type IKitAbilityCallback<P> = (payload: IKitAbilityPayload<P>) => void;

export type IKitChildren<P extends IPropertyScheme> = {
  [K in keyof P]: IKitAbilityCallback<P[keyof P]>
}


export type IAbilityProps<P extends IPropertyScheme, Ability extends IAbilitiesKit<P>> = {
  ability?: (ability: Ability) => Ability
}

export interface IAbilitiesKit<P extends IPropertyScheme> {
  property: IProperty<P>;

  initialize(): void;

  bind(index: keyof P, widgetConstructor: IKitAbility): this;
}