import {IColorSlots, IPaletteKit, IToneSlots} from "../types";
import {FeatureBatch} from "../constants";
import {FeatureKit} from "./feature";

export class PaletteKit extends FeatureKit<IToneSlots> implements IPaletteKit {
  protected name: string = 'palette';
  protected identifier: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Color;
  protected _computed: IColorSlots | undefined;
}
