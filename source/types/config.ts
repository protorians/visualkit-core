import type {ICustomSize, ISize} from "./sizes";
import {IThemeConfig} from "./theme";
import {IRuleKit} from "./rules";
import {IScreenConfig} from "./screen";

export type IConfigSchematic = {

  /**
   * Config Mode
   */
  command?: string;

  // /**
  //  * Use VisualKit Runtime
  //  */
  // useRuntime?: boolean;

  /**
   * Theme
   * @description Theme settings
   */
  theme: IThemeConfig;

  /**
   * Sizes
   * @description Sizes collection
   */
  sizes?: Partial<ISize> | ICustomSize;


  /**
   * Rules
   * @description Directives to transform detected values
   */
  rules?: IRuleKit[];


  /**
   * Config Screen
   */
  screen?: IScreenConfig;


  /**
   * Config Build
   */
  build?: IConfigSchematicBuild;


}


export type IConfigSchematicBuild = {
  minify?: boolean;
  verbose?: boolean;
  splitStyle?: boolean;
  type?: IConfigSchematicBuildType
  autoImports?: boolean;

  /**
   * Config Directories
   */
  directories?: IConfigSchematicBuildDirectories;

}

export type IConfigSchematicBuildType = 'css' | 'scss' | 'less'

export type IConfigSchematicBuildDirectories = {
  root?: string;
  serve?: string;
  build?: string;
}
