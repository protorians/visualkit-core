import {ConfigKit, FontKit, PaletteKit, ThemeColorKit, ThemePropertyKit, ToneKit} from "../foundation";
import {Logger} from "../utils/logger";
import * as fs from "node:fs";
import type {IConfigSchematicBuild} from "../types";
import * as path from "node:path";
import * as process from "node:process";


export class RaitonPlugin {

  static readonly identifier: string = 'visualkit-raiton-plugin';
  static readonly configFilename: string = 'visualkit.config.mjs';
  static readonly cachesDir: string = '.visualkit';

  protected _cacheDir: string = '';
  protected _themeFilePath: string = '';

  get root(): string {
    return this._root;
  }

  get extension(): string {
    return `.${ConfigKit.schematic.build?.type || 'css'}`
  }

  constructor(
    protected _root: string,
  ) {
  }

  async initialize() {
    if (ConfigKit.schematic.build?.verbose) Logger.highlight('[CONFIG]', 'Loading...')

    const configFile = `${this._root}/${RaitonPlugin.configFilename}`;
    if (!fs.existsSync(configFile)) throw new Error('Visualkit config file not found!')
    await import(/* @vite-ignore */ configFile).catch(console.error);

    if (ConfigKit.schematic.build?.verbose) {
      Logger.highlight('[CONFIG]', 'loaded')
      Logger.highlight('[RULES]', '', ConfigKit.schematic.rules?.length || '< No rules >')
    }
    return ConfigKit;
  }

  caches(): this {
    const root = path.resolve(ConfigKit.schematic.build?.directories?.root || process.cwd())
    const directory = `${root}${path.sep}${RaitonPlugin.cachesDir}`;

    if (!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true,})
    if (!fs.statSync(directory).isDirectory()) fs.mkdirSync(directory, {recursive: true,})

    fs.writeFileSync(`${directory}${path.sep}globals.${ConfigKit.schematic.build?.type || 'css'}`, ``);

    fs.writeFileSync(`${directory}${path.sep}main.js`, `import "../${RaitonPlugin.configFilename}";
import "@visualkit/core/appearance";
import "@visualkit/core/main";`);

    if (ConfigKit.schematic.build?.verbose) {
      Logger.notice('[CACHES]', 'ready')
    }
    return this;
  }

  configuration(config: any) {
    ConfigKit.schematic.command = config.command || 'serve';
    ConfigKit.schematic.build = ConfigKit.schematic.build || {} as IConfigSchematicBuild;
    ConfigKit.schematic.build.directories = ConfigKit.schematic.build.directories || {};
    ConfigKit.schematic.build.directories.root = config.root;
    ConfigKit.schematic.build.directories.serve = path.resolve(config.publicDir, `./${config.build.assetsDir}`);
    ConfigKit.schematic.build.directories.build = path.resolve(config.root, `./${config.build.outDir}`, `./${config.build.assetsDir}`);

    this._root = ConfigKit.schematic.build?.directories?.root || process.cwd();
    this._cacheDir = `${this._root}${path.sep}${RaitonPlugin.cachesDir}`
    this._themeFilePath = `${this._cacheDir}${path.sep}theme${this.extension}`

    return this;
  }

  themes() {

    /**
     * Clear file
     */
    if (fs.existsSync(this._themeFilePath)) {
      if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Clear theme file')
      fs.writeFileSync(this._themeFilePath, '')
    }

    /**
     * Generate Palettes
     */
    PaletteKit.processing(ConfigKit.schematic.theme.palettes, this._themeFilePath)
    if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Generate theme palettes')


    /**
     * Generate Tones
     */
    ToneKit.processing(ConfigKit.schematic.theme.tones, this._themeFilePath)
    if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Generate theme tones')

    /**
     * Generate custom colors
     */
    if (ConfigKit.schematic.theme.colors) {
      ThemeColorKit.processing([{
        ...ConfigKit.schematic.theme.colors,
        id: ConfigKit.schematic.theme.name
      }], this._themeFilePath);
      if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Generate theme custom colors')
    }

    /**
     * Generate Properties
     */
    if (ConfigKit.schematic.theme.properties) {
      ThemePropertyKit.processing([{
        ...ConfigKit.schematic.theme.properties,
        id: ConfigKit.schematic.theme.name
      }], this._themeFilePath);
      if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Generate theme properties')
    }

    /**
     * Generate Fonts properties
     */
    if (ConfigKit.schematic.theme.font) {
      FontKit.processing([{
        ...ConfigKit.schematic.theme.font,
        id: ConfigKit.schematic.theme.name,
      }], this._themeFilePath);
      if (ConfigKit.schematic.build?.verbose) Logger.notice('THEME', 'Generate theme fonts properties')
    }


    return this;
  }


}