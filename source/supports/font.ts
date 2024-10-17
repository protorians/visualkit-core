import {FeatureKit} from "./feature";
import {IFont, IFontKit} from "../types";
import {FeatureBatch} from "../constants";


export class FontKit extends FeatureKit<IFont> implements IFontKit {
  protected name: string = 'name';
  protected identifier: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Property;
  protected prefix: string = 'font';
  protected _computed: IFont | undefined;
}
