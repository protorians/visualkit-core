import {IBuilderKit} from "./builder";

export interface IExcavationKit {
  get hostExtension(): string;

  get accepted(): boolean;

  readonly provider: string;

  builder: IBuilderKit;

  matches: RegExpExecArray[];

  source(source: string): this;

  htmlSource(source: string): this;

  load(): string;

  make(): this;
}