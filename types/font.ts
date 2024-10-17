import {WeightKit} from "../constants";
import {ISizeValues} from "./sizes";

export type IFontFamily = {
  [key: string]: string | string[];
}

/**
 * Font settings
 * @property size font-size
 * @property family font-family
 * @property weight font-weight
 */
export type IFont = {
  size?: ISizeValues;
  family?: IFontFamily;
  weight?: WeightKit;
}