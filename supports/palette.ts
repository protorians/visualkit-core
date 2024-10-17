import {IColorSlots, IPaletteKit, IToneSlots} from "../types";
import {FeatureKit} from "./feature";
import {FeatureBatch} from "../constants";

export class PaletteKit extends FeatureKit<IToneSlots> implements IPaletteKit {
  protected name: string = 'palette';
  protected identifier: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Color;
  protected _computed: IColorSlots | undefined;
}
