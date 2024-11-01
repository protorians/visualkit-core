import {IProperty} from "@protorians/core";
import {IStyleExtended} from "@protorians/widgets";

export type IStyleProps = IStyleExtended & {
  [key in keyof Omit<CSSStyleDeclaration, 'length'>]: string | number | null | undefined;
}

export interface IStyleKit{

  get computed(): Partial<IStyleProps>;

  get scope(): IProperty<Partial<IStyleProps>>;

  update(props: Partial<IStyleProps>): this;

}