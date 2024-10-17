import {IParameters} from "@protorians/widgets"

/**
 * IRuleKitPayload
 * @description Data sent when pattern is ok
 * @property matches RegExpMatchArray
 * @property element The detected HTML element
 * @property bind ClassName generated
 */
export type IRuleKitPayload = {
  value: string;
  target: HTMLElement;
  selector: string;
  property: string;
  namespace?: string;
}

/**
 * IRuleKit
 * @description Change behavior of values based on those detected when auto-building style in VisualKit
 */
export interface IRuleKit<P extends IParameters> {

  get name(): string;

  readonly parameter: P;

  get query(): string;

  get expression(): string;

  get property(): string | undefined;

  value: IRuleKitTransformer;
}

export type IAliasRule = {
  alias: string;
  property?: string;
  transform: IRuleKitTransformer
}

export type INamespaceRule = {
  namespace: string;
  transform: IRuleKitTransformer
}

export type IRuleKitSyntheticValues = string | number | IRuleKitDetails | undefined;

export type IRuleKitTransformer = (payload: IRuleKitPayload) => IRuleKitSyntheticValues;

export type IRuleKitDetails = {
  media?: string;
  keyframe?: string;
  layer?: string;
  support?: string;
  value?: string;
}
