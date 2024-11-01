/**
 * IRuleKitPayload
 * @description Data sent when pattern is ok
 * @property matches RegExpMatchArray
 * @property element The detected HTML element
 * @property bind ClassName generated
 */
export type IRuleKitPayload = {
  value: string;
  target?: HTMLElement;
  selector: string;
}

/**
 * IRuleKit
 * @description Change behavior of values based on those detected when auto-building style in VisualKit
 */
export interface IRuleKit {

  get name(): string;

  readonly props: IRuleKitProps;

  get query(): string;

  get alias(): string;

  get ns(): string;

  value: IRuleKitTransformer;
}

// export type IAliasRule = {
//   alias: string;
//   property?: string;
//   transform: IRuleKitTransformer
// }
//
// export type INamespaceRule = {
//   namespace: string;
//   transform: IRuleKitTransformer
// }

export type IRuleKitProps = {
  alias: string;
  namespace?: string;
  transform: IRuleKitTransformer
} | {
  alias?: string;
  namespace: string;
  transform: IRuleKitTransformer
}

export type IRuleKitSyntheticValues = IRuleKitDetails | IRuleKitComposed | undefined;

export type IRuleKitTransformer = (payload: IRuleKitPayload) => IRuleKitSyntheticValues;

export type IRuleKitDetails = IRuleKitComposed & {
  '@media'?: string;
  '@keyframe'?: string;
  '@layer'?: string;
  '@support'?: string;
}

export type IRuleKitComposed = {
  [K in keyof CSSStyleDeclaration]?: string | undefined;
}

export type IRuleKitStyle = {
  [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K]
}