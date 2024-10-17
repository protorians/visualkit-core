import {IPalette} from "./palette";
import {ITone} from "./tone";
import {IFeatures} from "./feature";

/**
 * Theme Settings
 * @description Allows you to define the colors globally for your application.
 */
export type IThemeConfig = {
  /**
   * IThemeSettings.name
   */
  name: string,

  /**
   * IThemeSettings.palettes
   * @description Colors Palette list
   */
  palettes: IPalette[];

  /**
   * IThemeSettings.tones
   * @description Colors Tone list
   */
  tones: ITone[];

  /**
   * IConfigKit.colors
   * @description Create your customs colors list
   */
  colors?: IFeatures;

  /**
   * IConfigKit.colors
   * @description Create your customs colors list
   */
  properties?: IFeatures;

  // /**
  //  * IConfigKit.font
  //  * @description Font settings
  //  */
  // font?: IFont;

};


export type IThemeSettings = {

  /**
   * IThemeSettings.name
   */
  name: string,

  palette?: string;

  tone?: string;

}