import {FeatureKit} from "./feature";
import {FeatureBatch} from "../constants";
import {IColorSlots, IToneKit, IToneSlots} from "../types";

export class ToneKit extends FeatureKit<IToneSlots> implements IToneKit {
  protected name: string = 'tone';
  protected identifier: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Color;
  protected _computed: IColorSlots | undefined;
}
