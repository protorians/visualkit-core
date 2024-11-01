import {IFeatureKit, IFeatures, IFeaturesComputed, IColorSlots} from "../types";
import {ColorKit, ConfigKit} from "./index";
import {FeatureBatch} from "../constants";
import {unCamelCase} from "@protorians/core";
import {Logger} from "../utils/logger";
import * as fs from "node:fs";


export class FeatureKit<T extends IFeatures> implements IFeatureKit {

  protected name: string = 'feature';
  protected batch: FeatureBatch = FeatureBatch.Property;
  protected identifier: string = 'feature';
  protected prefix: string | undefined = undefined;
  protected _computed: IFeaturesComputed;
  protected _rendered: string = '';

  get computed(): IFeaturesComputed {
    return this._computed;
  }

  get rendered(): string {
    return this._rendered;
  }

  constructor(public readonly sheet: T) {
  }

  static attaches(features: IFeatureKit[]) {
    // return features.map(feature => feature.attach())

    console.log('ATTACHES', this, features)
  }

  static processing<T extends IFeatures>(features: T[], outFile: string): IFeatureKit[] {
    return features.map(feature => ((new this(feature)).render(outFile)))
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
          key === 'id' || key === 'scheme' ? undefined : ColorKit.create(key, `${color}`)
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

  // attach(): HTMLStyleElement | undefined {
  //   return this._computed
  //     ? StyleSheetKit.attach(
  //       `feature:${this.identifier}.${this.name}`,
  //       `*[${this.identifier}:${this.name}="${this.sheet.id}"]`,
  //       Object.entries(this._computed).filter(([key, value]) => key && key !== 'id' && value),
  //       `--${this.prefix || this.batch}-`,
  //       `${this.batch}`
  //     )
  //     : undefined;
  // }

  initializeOutFile(outFile: string) {
    try {
      if (!fs.existsSync(outFile)) {
        fs.writeFileSync(outFile, '')
      }
    } catch (err) {
      Logger.error('THEME', 'Initialize fail')
    }
    return this;
  }

  render(outFile?: string): this {
    (!this._computed ? this.compute() : this);

    if (this._computed) {

      const minify = typeof ConfigKit.schematic.build?.minify == 'boolean' ? ConfigKit.schematic.build?.minify : false;
      const eol = minify ? `` : `\n`;
      const payload: string[] = [];
      const prefix: string = `--${this.prefix || this.batch}-`;
      const layer: string = `${this.batch}`;
      let selector: string = `*[${this.identifier}:${this.name}="${this.sheet.id}"]`;
      let scheming: string|undefined = undefined;


      if ('scheme' in this.sheet && typeof this.sheet.scheme == 'string' && ConfigKit.schematic.theme.useClientTone) {
        if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Use client tone')
        scheming = `*[theme:color-scheme="${this.sheet.scheme}"]`
      }

      payload[payload.length] = `@layer ${(layer || 'visualkit').toLowerCase()}{`;
      payload[payload.length] = `${selector.replace(/:/gi, '\\:')}${scheming ? `, ${scheming.replace(/:/gi, '\\:')}` : ''} {`;

      Object.entries(this._computed)
        .filter(([key, value]) => key && key !== 'id' && key !== 'scheme' && value)
        .forEach(([property, value]) => {
          payload[payload.length] = `${prefix || ''}${unCamelCase(property)}: ${value};`
        })

      payload[payload.length] = `}`;
      payload[payload.length] = `}`;

      this._rendered = `${payload.join(eol)}${eol}`;

      if (outFile) {
        try {
          this.initializeOutFile(outFile)
          fs.appendFileSync(outFile, this._rendered)
          if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Update theme style')
        } catch (err) {
          Logger.error('THEME', 'Update fail')
        }
      }

    }

    return this;
  }

}