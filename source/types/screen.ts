export type IScreenConfig = {
  divider?: number;
  breakpoint?: Partial<IScreenBreakpoints>;
}

export type IScreenBreakpoints = {
  miniPhone: IScreenBreakpoint;
  phone: IScreenBreakpoint;
  tablet: IScreenBreakpoint;
  laptop: IScreenBreakpoint;
  desktop: IScreenBreakpoint;
  tv: IScreenBreakpoint;
}

export type IScreenBreakpoint = [number|undefined, number|undefined];
