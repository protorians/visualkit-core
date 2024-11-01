import type {IColorHex} from "../types";

export class ColorAssertion {

  static hex(color: string): asserts color is IColorHex {
    const hexColorRegex = /#[0-9A-Fa-f]{6,8}/;
    // const hexColorRegex = /^#([0-9a-fA-F]{3}){1,2}$/;
    if (!hexColorRegex.test(color)) {
      throw new Error(`[Color Assertion] "${color}" is not a hexadecimal color`);
    }
  }

  static isValidate(color: string): boolean {
    return /#[0-9A-Fa-f]{6,8}/.test(color)
  }

}
