import {IConfigKit} from "../types";
import {baseSizesKit} from "./config-sizes";
import {baseRulesKit} from "./config-rules";
import {PaletteKit} from "./palette";
import {ToneKit} from "./tone";
import {ThemeColorKit, ThemePropertyKit} from "./theme";
import {FontKit} from "./font";

export class ConfigKit {

  protected static _schematic: IConfigKit;

  static get schematic() {
    return this._schematic || ({} as IConfigKit);
  }

  static define(schematic: IConfigKit) {
    this._schematic = this.parse(schematic);
    return this;
  }

  static parse(schematic: IConfigKit) {

    schematic.theme.palettes = (typeof schematic.theme.palettes == 'undefined' ? [] : schematic.theme.palettes);
    schematic.theme.tones = (typeof schematic.theme.tones == 'undefined' ? [] : schematic.theme.tones);

    /**
     * Merge sizes
     */
    schematic.sizes = {...baseSizesKit(), ...(schematic.sizes || {})};

    /**
     * Merge rules
     */
    schematic.rules = [...baseRulesKit(), ...(schematic.rules || [])];

    /**
     * Create theme palettes
     */
    PaletteKit.processing(schematic.theme.palettes)

    /**
     * Create theme tones
     */
    ToneKit.processing(schematic.theme.tones)

    /**
     * Create theme custom colors
     */
    if (schematic.theme.colors) ThemeColorKit.processing([{
      ...schematic.theme.colors,
      id: schematic.theme.name
    }])

    /**
     * Create theme properties
     */
    if (schematic.theme.properties) ThemePropertyKit.processing([{
      ...schematic.theme.properties,
      id: schematic.theme.name
    }])

    /**
     * Create theme font features
     */
    if (schematic.theme.font) FontKit.processing([{
      ...schematic.theme.font,
      id: schematic.theme.name,
    }])

    return schematic;
  }

}