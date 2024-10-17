import type {
  IColorAlphas,
  IColorHex,
  IColorHslProps, IColorIntensities,
  IColorRgbAlphaProps,
  IColorRgbProps,
  IColorSlots,
  IColorValue
} from "../types";
import {ColorAssertion} from "./assertions";
import {interval, pad, trimSpace} from "../utils";

export class ColorKit {

  static RGB_PATTERN = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/

  static RGBA_PATTERN = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(.*)\)/

  static HEX_PATTERN = /#[0-9A-Fa-f]{6}/

  static HEX_ALPHA_PATTERN = /#[0-9A-Fa-f]{8}/

  static validate(value: string) {
    return CSS.supports('color', value);
  }

  static create<T extends string>(key: T, color: string, drift: number = 127.5) {
    const payload: IColorSlots = {} as IColorSlots;
    const hex: string = this.serialize(color);
    const intensity: number = this.intensity(hex);
    const isLight = intensity >= drift
    const deviantLite = Math.floor(drift * 0.1);

    payload[`${key}`] = hex;
    payload[`${key}-rgb`] = this.rgb(hex);
    payload[`${key}-alpha`] = this.rgba(hex, 5);
    payload[`${key}-intensity`] = `${intensity}`;
    payload[`${key}-invert`] = isLight
      ? this.lightness(hex, drift)
      : this.darkness(hex, drift)
    ;

    for (let opacity = 1; opacity <= 9; opacity++) {
      payload[
        `${key}-alpha-${opacity}` as `${`${string}`}-${IColorAlphas}`
        ] = this.rgba(color, opacity / 10);
    }

    // Intensity
    for (let index = 1; index <= 9; index++) {

      const hot = isLight
        ? this.lightness(hex, index * deviantLite)
        : this.darkness(hex, index * deviantLite)
      ;
      const hotKey = `${key}-${index * 100}` as `${`${string}`}-${IColorIntensities}`

      payload[hotKey] = hot;
      payload[`${hotKey}-invert`] = this.intensity(hot) >= drift
        ? this.lightness(hot, drift)
        : this.darkness(hot, drift)
      ;

      for (let opacity = 1; opacity <= 9; opacity++) {
        payload[
          `${hotKey}-alpha-${opacity}` as `${`${string}`}-${IColorIntensities}-${IColorAlphas}`
          ] = this.rgba(hot, opacity / 10);
      }

    }

    return payload;
  }

  static byteValues(value: number) {
    return interval(value, 0, 255);
  }

  static serialize(color: IColorValue): IColorHex {

    if (Array.isArray(color)) {

      if (color.length == 3) return this.rgbToHex(...color)

      else if (color.length == 4) return this.rgbaToHex(...color)

    } else {

      color = color.trim();

      if (color.toLowerCase().startsWith(`rgb(`)) {

        const rgb = trimSpace(color).match(this.RGB_PATTERN)
        return rgb ? this.rgbToHex(
          parseFloat(rgb[1] || '0'),
          parseFloat(rgb[2] || '0'),
          parseFloat(rgb[3] || '0')
        ) : '#000000';

      } else if (color.toLowerCase().startsWith(`rgba(`)) {

        const rgb = trimSpace(color).match(this.RGBA_PATTERN)
        return rgb ? this.rgbaToHex(
          parseInt(rgb[1] || '0'),
          parseInt(rgb[2] || '0'),
          parseInt(rgb[3] || '0'),
          (parseInt(rgb[4] || '1', 16) / 255),
        ) : '#000000';

      } else if (color.includes(',')) {

        const parse = color.split(',').map(v => parseInt(v, 1));
        const rgb = parse.length == 3 || parse.length == 4 ? parse : undefined;

        if (rgb) {
          if (rgb.length == 3) return this.rgbToHex(...rgb as [number, number, number]);
          else if (rgb.length == 4) return this.rgbaToHex(...rgb as [number, number, number, number]);
        }

      } else if (color.length == 4 && color.startsWith('#')) {
        const hex = color.substring(1)
        return `#${hex}${hex}`;
      }

    }

    return trimSpace(`${color}`);
  }

  static hexDecimal(value: number): string {
    const hex = value.toString(16);
    return (hex.length == 1 ? `0${hex}` : hex).substring(0, 2);
  }

  static rgbToHex(red: number, green: number, blue: number): string {
    return `#${this.hexDecimal(red)}${this.hexDecimal(green)}${this.hexDecimal(blue)}`
  }

  static rgbaToHex(red: number, green: number, blue: number, alpha: number) {
    return this.fixHex(`#${this.hexDecimal(red)}${this.hexDecimal(green)}${this.hexDecimal(blue)}${((alpha * 255) | 1 << 8).toString(16).substring(1)}`)
  }

  static fixHex(hexColor: string) {
    return `#${hexColor.replace(/[^0-9a-fA-F]/g, '')}`;
  }

  static hexToRgb(color: IColorHex): IColorRgbProps {
    ColorAssertion.hex(color)
    const rgb = parseInt(this.serialize(color).substring(1, 7), 16);
    return {
      red: (rgb >> 16) & 0xff,
      green: (rgb >> 8) & 0xff,
      blue: (rgb >> 0) & 0xff,
    };
  }

  static hexToRgba(color: IColorHex): IColorRgbAlphaProps {
    ColorAssertion.hex(color)
    const hex = this.serialize(color);
    const rgb = parseInt(hex.substring(1, 7), 16);

    return rgb ? {
      red: (rgb >> 16) & 0xff,
      green: (rgb >> 8) & 0xff,
      blue: (rgb >> 0) & 0xff,
      alpha: (parseInt(hex.substring(7, 9) || 'ff', 16) / 255),
    } : {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    }

  }

  static rgb(color: IColorValue): string {
    const rgb = this.hexToRgb(this.serialize(color));
    return trimSpace(`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`);
  }

  static rgba(color: IColorValue, alpha: number): string {
    const rgb = this.hexToRgb(this.serialize(color));
    alpha = alpha > 1 ? alpha / 10 : alpha;
    alpha = alpha < 0 ? alpha : Math.abs(alpha)
    return trimSpace(`rgba(${rgb.red},${rgb.green},${rgb.blue},${alpha})`);
  }


  static toHsl(color: IColorValue): IColorHslProps {

    const hex = this.serialize(color),
      red: number = this.red(hex),
      green: number = this.green(hex),
      blue: number = this.blue(hex),
      max: number = Math.max(red, green, blue),
      min: number = Math.min(red, green, blue),
      delta: number = max - min,
      lightness: number = (max + min) / 2;

    return {
      hue: (
        delta == 0 ? 0 : (
          (max == red) ? 60 * (((green - blue) / delta) % 6) : (
            (max == green) ? 60 * (((blue - red) / delta) + 2) : (
              60 * (((red - green) / delta) + 4)
            )
          )
        )
      ),
      saturation: (delta == 0) ? 0 : (delta / (1 - Math.abs(2 * lightness - 1))),
      lightness
    }
  }


  static hslToRgb(hsl: IColorHslProps) {
    let calculate: number = (1 - Math.abs(2 * hsl.lightness - 1)) * hsl.saturation,
      auto: number = calculate * (1 - Math.abs((hsl.hue / 60) % 2 - 1)),
      lightness: number = hsl.lightness - calculate / 2,
      red: number = 0,
      green: number = 0,
      blue: number = 0;

    if (hsl.hue < 60) {
      red = calculate;
      green = auto;
      blue = 0;
    } else if (hsl.hue < 120) {
      red = auto;
      green = calculate;
      blue = 0;
    } else if (hsl.hue < 180) {
      red = 0;
      green = calculate;
      blue = auto;
    } else if (hsl.hue < 240) {
      red = 0;
      green = auto;
      blue = calculate;
    } else if (hsl.hue < 300) {
      red = auto;
      green = 0;
      blue = calculate;
    } else {
      red = calculate;
      green = 0;
      blue = auto;
    }

    red = this.primary(red, lightness);
    green = this.primary(green, lightness);
    blue = this.primary(blue, lightness);

    return this.rgb(this.rgbToHex(red, green, blue));
  }

  static primary(color: number, m: number) {
    color = Math.floor((color + m) * 255);
    if (color < 0) color = 0;
    return color;
  }

  static invert(color: IColorValue): string {
    const hex = this.serialize(color);
    return `#${
      [
        pad((255 - parseInt(hex.slice(1, 3), 16)).toString(16)),
        pad((255 - parseInt(hex.slice(3, 5), 16)).toString(16)),
        pad((255 - parseInt(hex.slice(5, 7), 16)).toString(16)),
      ].join('')
    }`
  }

  static red(color: IColorValue): number {
    return (parseInt(this.serialize(color).substring(1), 16) >> 16) & 255;
  }

  static green(color: IColorValue): number {
    return (parseInt(this.serialize(color).substring(1), 16) >> 8) & 255;
  }

  static blue(color: IColorValue): number {
    return parseInt(this.serialize(color).substring(1), 16) & 255;
  }

  static hue(color: IColorValue, amount: number = 1): string {
    const hsl = this.toHsl(this.serialize(color));
    hsl.hue = hsl.hue + (this.byteValues(amount) / 255)
    return this.serialize(this.hslToRgb(hsl));
  }

  static saturate(color: IColorValue, amount: number = 0): string {
    const hsl = this.toHsl(this.serialize(color));
    hsl.saturation = hsl.saturation + (this.byteValues(amount) / 255)
    return this.serialize(this.hslToRgb(hsl));
  }

  static scale(color: IColorValue, amount: number = 0, sens: boolean = true): string {
    const rgb = this.hexToRgba(this.serialize(color));
    return this.rgbaToHex(
      this.byteValues(sens ? rgb.red + amount : rgb.red - amount),
      this.byteValues(sens ? rgb.green + amount : rgb.green - amount),
      this.byteValues(sens ? rgb.blue + amount : rgb.blue - amount),
      rgb.alpha,
    );
  }

  static lightness(color: IColorValue, amount: number = 0): string {
    return this.scale(color, amount, true);
  }

  static darkness(color: IColorValue, amount: number = 0): string {
    return this.scale(color, amount, false);
  }

  static whiteness(color: IColorValue, amount: number = 0): string {
    const hsl = this.toHsl(this.serialize(color));
    hsl.lightness = hsl.lightness + (this.byteValues(amount) / 255)
    return this.serialize(this.hslToRgb(hsl));
  }

  static blackness(color: IColorValue, amount: number = 0): string {
    const hsl = this.toHsl(this.serialize(color));
    hsl.lightness = hsl.lightness - (this.byteValues(amount) / 255)
    return this.serialize(this.hslToRgb(hsl));
  }

  static intensity(color: IColorValue): number {
    const rgb = parseInt(this.serialize(color).substring(1), 16);
    return Math.ceil(0.2126 * ((rgb >> 16) & 0xff) + 0.7152 * ((rgb >> 8) & 0xff) + 0.0722 * ((rgb >> 0) & 0xff));
  }

  static alpha(color: IColorValue): number {
    return this.hexToRgba(this.serialize(color)).alpha;
  }

}
