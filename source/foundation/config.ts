import type {IConfigSchematic, IConfigSchematicBuild} from "../types";
import {baseSizesKit} from "./config-sizes";
import {rulesKitPack} from "./config-rules";

export class ConfigKit {

  protected static _schematic: IConfigSchematic;

  static get schematic() {
    return this._schematic || ({} as IConfigSchematic);
  }

  static define(schematic: IConfigSchematic) {
    this._schematic = this.parse(schematic);
    return this;
  }

  static parse(schematic?: IConfigSchematic) {

    schematic = schematic || this._schematic;

    /**
     * Build config
     */
    schematic.build = schematic.build || {} as IConfigSchematicBuild;

    /**
     * Fix theme palettes list
     */
    schematic.theme.palettes = (typeof schematic.theme.palettes == 'undefined' ? [] : schematic.theme.palettes);

    /**
     * Fix theme tones list
     */
    schematic.theme.tones = (typeof schematic.theme.tones == 'undefined' ? [] : schematic.theme.tones);

    /**
     * Merge sizes
     */
    schematic.sizes = {...baseSizesKit(), ...(schematic.sizes || {})};

    /**
     * Merge rules
     */
    schematic.rules = schematic.rules || rulesKitPack();


    /**
     * Fix theme custom colors
     */
    schematic.theme.colors = schematic.theme.colors || {}

    /**
     * Fix theme properties
     */
    schematic.theme.properties = schematic.theme.properties || {}

    /**
     * Fix theme font features
     */
    schematic.theme.font = schematic.theme.font || {}

    return schematic;
  }

}