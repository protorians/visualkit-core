import {IColorSlots} from "./color";
import {FeatureBatch} from "../constants";

export interface IFeatureKit {

  get computed(): IFeaturesComputed;

  get type(): FeatureBatch;

  sheet: IFeatures;

  compute(): this;

  attach(): HTMLStyleElement | undefined;

  render(): this;
}

export type IFeatures = {
  [K: string]: string;
}

export type IFeaturesSlots<T extends IFeatures> = Omit<T, 'id'>

export type IFeaturesComputed = IFeaturesSlots<IFeatures> | IColorSlots | undefined