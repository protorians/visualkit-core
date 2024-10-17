import type {ICustomSize, ISize} from "./sizes";
import {IThemeConfig} from "./theme";
import {IRuleKit} from "./rules";

export type IConfigKit = {

  /**
   * IConfigKit.theme
   * @description Theme settings
   */
  theme: IThemeConfig;

  /**
   * IConfigKit.sizes
   * @description Sizes collection
   */
  sizes?: Partial<ISize> | ICustomSize;


  /**
   * IConfigKit.directives
   * @description Directives to transform detected values
   */
  rules?: IRuleKit<any>[];

}
