import {IBuilderKit} from "./builder";
import {IRuleKitSyntheticValues} from "./rules";

export interface IExcavationKit {
  get hostExtension(): string;

  get accepted(): boolean;

  readonly provider: string;

  builder: IBuilderKit;

  matches: RegExpExecArray[];

  source(source: string): this;

  htmlSource(source: string): this;

  load(): string;

  resolve(selector: string, sequences: string[], value: string): IRuleKitSyntheticValues;

  make(): this;
}