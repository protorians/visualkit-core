import {IColorSlots, IThemeSettings, IToneKit, IFeatures} from "../types";
import {ConfigKit} from "./config";
import {VisualKitException} from "./exception";
import {FeatureKit} from "./feature";
import {FeatureBatch} from "../constants";

export class ThemeKit {

  static get cacheKey(): string {
    return '@visual.kit.theme.settings'
  }

  static get settings(): IThemeSettings {
    const cache = localStorage.getItem(this.cacheKey)
    return (cache ? JSON.parse(cache) : this.default) as IThemeSettings;
  }

  static get default(): IThemeSettings {
    if (!('theme' in ConfigKit.schematic)) throw new VisualKitException('[ThemeKit] Invalid theme settings');
    return {
      name: ConfigKit.schematic.theme.name,
      palette: (ConfigKit.schematic.theme.palettes.length) ? ConfigKit.schematic.theme.palettes[0].id : undefined,
      tone: (ConfigKit.schematic.theme.tones.length) ? ConfigKit.schematic.theme.tones[0].id : undefined,
    };
  }

  static set settings(settings: IThemeSettings) {
    localStorage.setItem(this.cacheKey, JSON.stringify(settings));
  }

  static switch(name: string, target?: HTMLElement): typeof this {
    target = target || document.documentElement;
    target.setAttribute('theme:name', name);
    if (document.documentElement === target) this.settings = {...this.settings, name,};
    return this;
  }

  static palette(palette: string, target?: HTMLElement): typeof this {
    target = target || document.documentElement;
    target.setAttribute('theme:palette', palette);
    if (document.documentElement === target) this.settings = {...this.settings, palette,};
    return this;
  }

  static tone(tone: string, target?: HTMLElement): typeof this {
    target = target || document.documentElement;
    target.setAttribute('theme:tone', tone);
    if (document.documentElement === target) this.settings = {...this.settings, tone,};
    return this;
  }

  static run() {
    return this
      .switch(this.settings.name)
      .palette(ConfigKit.schematic.theme.palettes.length ? ConfigKit.schematic.theme.palettes[0].id : 'default')
      .tone(ConfigKit.schematic.theme.tones.length ? ConfigKit.schematic.theme.tones[0].id : 'default')
  }

}


export class ThemeColorKit extends FeatureKit<IFeatures> implements IToneKit {
  protected name: string = 'name';
  protected identifier: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Color;
  protected _computed: IColorSlots | undefined;
}

export class ThemePropertyKit extends FeatureKit<IFeatures> implements IToneKit {
  protected name: string = 'name';
  protected identifier: string = 'theme';
  protected batch: FeatureBatch = FeatureBatch.Property;
  protected _computed: IFeatures | undefined;
}
