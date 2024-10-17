export type IColorSlots = {
  [key: string]: string;
}

export type IColorAspects = 'outline' | 'semi' | 'link' | 'semi-outline';

export type IColorKey =
  'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'text'
  | 'tint'
  | 'untint'
  | 'error'
  | 'warning'
  | 'success'
  | 'white'
  | 'black'
  ;

export type IColorIntensities = 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900

export type IColorAlphas =
  'alpha-1'
  | 'alpha-2'
  | 'alpha-3'
  | 'alpha-4'
  | 'alpha-5'
  | 'alpha-6'
  | 'alpha-7'
  | 'alpha-8'
  | 'alpha-9'
  ;

export type IColorExtended<T extends string> = `${T}`
  | `${T}-alpha`
  | `${T}-rgb`
  | `${T}-intensity`
  | `${`${T}`}-${IColorAlphas}`
  | `${`${T}`}-${IColorIntensities}`
  | `${`${T}`}-${IColorIntensities}-${IColorAlphas}`
  | `${T}-invert`
  // | `${`${T}`}-${IColorAlphas}-invert`
  | `${`${T}`}-${IColorIntensities}-invert`
// | `${`${T}`}-${IColorIntensities}-${IColorAlphas}-invert`

export type IColorHex = string;

export type IColorRgbStrict = `rgb(${number},${number},${number})`;

export type IColorRgb = IColorRgbStrict
  | `${number},${number},${number}`
  | [number, number, number];

export type IColorRgba = `rgba(${number},${number},${number},${number})`;

export type IColorRgbAlpha = IColorRgba
  | `${number},${number},${number},${number}`
  | [number, number, number, number];

export type IColorValue = IColorHex | IColorRgb | IColorRgbAlpha;

export type IColorAdjustOptions = {
  red?: number,
  green?: number,
  blue?: number,
  hue?: number,
  saturation?: number,
  lightness?: number,
  whiteness?: number,
  blackness?: number,
  alpha?: number
}

export type IColorRgbProps = {
  red: number;
  green: number;
  blue: number;
}

export type IColorRgbAlphaProps = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export type IColorHslProps = {
  hue: number;
  saturation: number;
  lightness: number;
}

