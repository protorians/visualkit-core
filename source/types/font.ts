import {WeightKit} from "../constants";
import {ISizeValues} from "./sizes";
import {IFeatureKit} from "./feature";

export type IFontFamily = string;

// export type IFontFamily = {
//   [key: string]: string | string[];
// }

/**
 * Font settings
 * @property size font-size
 * @property family font-family
 * @property weight font-weight
 */
export type IFont = {
  size?: ISizeValues
    | "smaller"
    | "small"
    | "x-small"
    | "xx-small"
    | "xxx-small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large"
    | "xxx-large"
    | "larger";
  family?: IFontFamily;
  weight?: WeightKit;
}

export interface IFontKit extends IFeatureKit {
}