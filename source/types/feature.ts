import {IColorSlots} from "./color";
import {FeatureBatch} from "../constants";

export interface IFeatureKit {

  get computed(): IFeaturesComputed;

  get rendered(): string;

  get type(): FeatureBatch;

  sheet: IFeatures;

  compute(): this;

  // attach(): HTMLStyleElement | undefined;

  render(directory?: string): this;
}

export type IFeatures = {
  [K: string]: string | number;
}

export type IFeaturesSlots<T extends IFeatures> = Omit<T, 'id'>

export type IFeaturesComputed = IFeaturesSlots<IFeatures> | IColorSlots | undefined