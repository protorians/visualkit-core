import type {IRuleKitSyntheticValues} from "./rules";

export type IBuilderEntry = {
  selector: string;
  properties: IRuleKitSyntheticValues
}

export type IBuilderEntries = {
  [K: string]: IRuleKitSyntheticValues
}

export type IBuilderComputed = string[];

export interface IBuilderKit {

  get directory(): string;

  get computed(): string[];

  get exported(): boolean;

  entries: IBuilderEntries;

  push(entry: IBuilderEntry, isCommon?: boolean): this;

  remove(selector: string): this;

  generate(host: string): this;

  prepare(filename: string): this;

  compute(selector: string, properties: IRuleKitSyntheticValues): string;

  load(provider: string): string;

  export(provider: string, computed: string): boolean;

}