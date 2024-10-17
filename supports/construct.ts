import {IConstructCallbackResponse} from "../types";

export class ConstructKit {
  protected static entries: IConstructCallbackResponse<any>[] = [];

  static inject<T extends HTMLElement>(fn: IConstructCallbackResponse<T>): IConstructCallbackResponse<T> {
    this.entries.push(fn);
    return fn;
  }

  static call<T extends HTMLElement>(target: T): T[][] {
    return this.entries.map(fn => fn(target) as T[])
  }

  static get dependencies(): IConstructCallbackResponse<any>[] {
    return this.entries;
  }
}
