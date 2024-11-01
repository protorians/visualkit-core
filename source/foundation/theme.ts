import {FeatureKit} from "./feature";
import {IColorSlots, IFeatures, IToneKit} from "../types";
import {FeatureBatch} from "../constants";


export class ThemeColorKit extends FeatureKit<IFeatures> implements IToneKit {
  protected name: string = 'name';
  protected identifier: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Color;
  protected _computed: IColorSlots | undefined;
}

export class ThemePropertyKit extends FeatureKit<IFeatures> implements IToneKit {
  protected name: string = 'name';
  protected identifier: string = 'theme';
  protected prefix: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Property;
  protected _computed: IFeatures | undefined;
}
