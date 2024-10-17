import {IFeatureKit, IFeatures, IFeaturesComputed} from "../types/feature";
import {IColorSlots} from "../types";
import {ColorKit} from "./colors";
import {StyleSheetKit} from "./stylesheet";
import {FeatureBatch} from "../constants";


export class FeatureKit<T extends IFeatures> implements IFeatureKit {

  protected name: string = 'feature';
  protected batch: FeatureBatch = FeatureBatch.Property;
  protected identifier: string = 'feature';
  protected _computed: IFeaturesComputed;

  get computed(): IFeaturesComputed {
    return this._computed;
  }

  constructor(public readonly sheet: T) {
  }

  static attaches(features: IFeatureKit[]) {
    return features.map(feature => feature.attach())
  }

  static processing<T extends IFeatures>(features: T[]): IFeatureKit[] {
    return features.map(feature =>
      ((new this(feature)).render())
    )
  }

  get type(): FeatureBatch {
    return this.batch;
  }

  compute(): this {

    if (this.batch == FeatureBatch.Property) {
      this._computed = {...this.sheet, id: undefined};
    } else if (this.batch == FeatureBatch.Color) {

      this._computed = Object
        .entries(this.sheet)
        .map<IColorSlots | undefined>(([key, color]) =>
          key === 'id' ? undefined : ColorKit.create(key, `${color}`)
        )
        .filter(Boolean)
        .reduce(
          (current, array) =>
            ({...current, ...array} as IColorSlots)
          , {} as IColorSlots
        );

    }

    return this;
  }

  attach(): HTMLStyleElement | undefined {
    return this._computed
      ? StyleSheetKit.attach(
        `feature:${this.identifier}.${this.name}`,
        `*[${this.identifier}:${this.name}="${this.sheet.id}"]`,
        Object.entries(this._computed).filter(([key, value]) => key && key !== 'id' && value),
        `--${this.batch}-`,
        `${this.batch}`
      )
      : undefined;
  }

  render(): this {
    (!this._computed ? this.compute() : this).attach();
    return this;
  }

}