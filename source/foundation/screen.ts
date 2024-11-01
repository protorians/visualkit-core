import type {IScreenBreakpoint, IScreenBreakpoints} from "../types";
import {ConfigKit} from "./config";

export class ScreenKit {

  static get defaultBreakpoints(): IScreenBreakpoints {
    return {
      miniPhone: [undefined, 320],
      phone: [321, 480],
      tablet: [481, 768],
      laptop: [769, 1024],
      desktop: [1025, 1200],
      tv: [1201, undefined],
    }
  }

  static breakpoint(key: keyof IScreenBreakpoints): IScreenBreakpoint | undefined {
    return ({...this.defaultBreakpoints, ...ConfigKit.schematic.screen?.breakpoint} as IScreenBreakpoints)[key] || undefined;
  }

  static mediaQuery(key: keyof IScreenBreakpoints) {
    const breakpoint = this.breakpoint(key);
    const min = breakpoint ? breakpoint[0] || undefined : undefined;
    const max = breakpoint ? breakpoint[1] || undefined : undefined;

    if (min && !max) {
      return `(min-width:${min}px)`
    } else if (!min && max) {
      return `(max-width:${max}px)`
    } else return `(min-width:${min}px) and (max-width:${max}px)`
  }

  static get divider(): number{
    return ConfigKit.schematic.screen?.divider || 16
  }

}