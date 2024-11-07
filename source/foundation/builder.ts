import type {IBuilderComputed, IBuilderEntries, IBuilderEntry, IBuilderKit, IRuleKitSyntheticValues} from "../types";
import {ConfigKit} from "./config";
import * as path from "node:path";
import * as fs from "node:fs";
import {unCamelCase} from "@protorians/core";
import {Logger} from "../utils/logger";
import {RaitonPlugin} from "../plugin/raiton";


export class BuilderKit implements IBuilderKit {

  static common: IBuilderEntries = {} as IBuilderEntries;
  static generated: IBuilderEntries = {} as IBuilderEntries;

  static get extension(): string {
    return `.${ConfigKit.schematic.build?.type || 'css'}`
  }

  static getExportFilename(provider: string): string {
    return `${path.dirname(provider)}${path.sep}${path.parse(provider).name}${this.extension}`
  }

  static begin(provider: string): typeof this {
    try {
      const filename = this.getExportFilename(provider);
      fs.writeFileSync(filename, '')
    } catch (er) {
      console.error('[VisualKit] before export failed')
    }
    return this;
  }

  static close(provider: string): typeof this {
    try {
      const filename = this.getExportFilename(provider);
      if (fs.existsSync(filename)) {
        const content = fs.readFileSync(filename, {encoding: 'utf-8'});
        if (!content.trim().length) fs.unlinkSync(filename)
      }
    } catch (er) {
      console.error('[VisualKit] after export failed')
    }

    return this;
  }


  get directory(): string {
    return (
      ConfigKit.schematic.command == 'serve'
        ? ConfigKit.schematic.build?.directories?.serve
        : ConfigKit.schematic.build?.directories?.build
    ) || process.cwd();
  }

  get computed(): string[] {
    return this._computed
  }

  get exported(): boolean {
    return this._exported
  }


  protected _computed: IBuilderComputed
  protected _exported: boolean = false;
  entries: IBuilderEntries;

  constructor() {
    this.entries = {} as IBuilderEntries;
    this._computed = []
  }

  push(entry: IBuilderEntry, isCommon?: boolean): this {

    if (ConfigKit.schematic.build?.splitStyle) {
      // if (entry.selector in BuilderKit.generated) {
      //   BuilderKit.common[entry.selector] = entry.properties;
      // } else

      // entry.selector in this.entries || entry.selector in BuilderKit.common ||
      if (isCommon) {
        BuilderKit.common[entry.selector] = entry.properties;
        // if (entry.selector in this.entries) this.remove(entry.selector)
      } else {
        this.entries[entry.selector] = entry.properties;
      }
    } else {
      BuilderKit.common[entry.selector] = entry.properties;
    }

    return this;
  }

  remove(selector: string): this {
    const entries = {} as IBuilderEntries

    Object.entries(this.entries)
      .forEach(([key, entry]) => (selector != key) ? entries[key] = entry : void (0))

    this.entries = entries;
    return this;
  }

  prepare(filename: string) {
    const dir = path.dirname(filename)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true,})
    if (!fs.statSync(dir).isDirectory()) fs.mkdirSync(dir, {recursive: true,})
    return this;
  }

  generate(provider: string): this {
    const entries = Object.entries(this.entries);
    const commonEntries = Object.entries(BuilderKit.common);
    const root = path.resolve(ConfigKit.schematic.build?.directories?.root || process.cwd())
    const directory = `${root}/${RaitonPlugin.cachesDir}`;

    // this.beforeExport(provider)

    if (ConfigKit.schematic.build?.verbose && !provider.includes('node_modules') && (entries.length))
      Logger.notice('[VISUALKIT]', Logger.getFileRelativePath(provider), 'generate...',)

    if (entries.length) {
      entries.forEach(([selector, properties]) => {
        this.export(provider, this.compute(selector, properties))
        BuilderKit.generated[selector] = properties;
      })
    }

    if (commonEntries.length) {
      commonEntries.forEach(([selector, properties]) => {
        if (!(selector in BuilderKit.generated)) {
          this.export(`${directory}/globals`, this.compute(selector, properties))
          BuilderKit.generated[selector] = properties;
        }
      })
    }

    if (ConfigKit.schematic.build?.verbose && !provider.includes('node_modules') && (entries.length))
      Logger.notice('[VISUALKIT]', Logger.getFileRelativePath(provider), 'updated')

    // if (ConfigKit.schematic.build?.verbose && !provider.includes('node_modules') && (!entries.length))
    //   Logger.highlight('[VISUALKIT]', Logger.getFileRelativePath(provider), 'skipped')

    if (!provider.includes('node_modules') && (entries.length)) Logger.success('[VISUALKIT]', Logger.getFileRelativePath(provider), 'DONE')

    return this;
  }

  load(provider: string): string {
    try {
      return fs.readFileSync(BuilderKit.getExportFilename(provider), {encoding: 'utf-8'});
    } catch (er) {
      console.error('[VisualKit] initializeExport failed')
    }

    return '';
  }

  export(provider: string, computed: string): boolean {
    try {
      if (!computed.trim().length) {
        this._exported = true;
        return true;
      }

      const filename = BuilderKit.getExportFilename(provider)
      // const filename = `${provider}${this.extension}`
      const minify = typeof ConfigKit.schematic.build?.minify == 'boolean' ? ConfigKit.schematic.build?.minify : false;
      const eol = minify ? `` : `\n`;

      if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, '')
      }
      fs.appendFileSync(filename, `${computed}${eol}`)
      this._exported = true;
      return true;
    } catch (er) {
      console.error('[VisualKit] Build exporting failed')
      return false;
    }
  }


  static parseSelector(selector: string) {
    return selector
      .replace(/:/gi, '\\:')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
  }

  compute(selector: string, properties: IRuleKitSyntheticValues): string {
    const nested: string[] = [];
    const pseudo: string[] = [];
    const minify = typeof ConfigKit.schematic.build?.minify == 'boolean' ? ConfigKit.schematic.build?.minify : false;
    const eol = minify ? `` : `\n`;

    if (properties) {
      const compose = `{${eol}${
        Object.entries(properties)
          .map(([prop, value]) => {
            if (prop == '@media' || prop == '@keyframe' || prop == '@layer' || prop == '@support') {
              nested[nested.length] = `${prop} ${value}`;
              return false;
            } else if (prop == '@pseudo' && (`${value}`).startsWith(':')) {
              pseudo[pseudo.length] = `${value}`;
              return false;
            } else return `${unCamelCase(prop)}:${value}`
          }).filter(Boolean).join(`;${eol}`)
      }${eol}}`

      if (!compose.trim().replace(/\n/g, '').replace(/{}/g, '').length) return '';

      const withPseudo = pseudo.length
        ? pseudo.map((ps, index) => {
          return index == (pseudo.length - 1) ? `${eol}${BuilderKit.parseSelector(selector)}${ps} ${compose}${eol}` : `${ps}{${eol}`
        }).join(`${eol}`)
        : `${BuilderKit.parseSelector(selector)} ${compose}`

      return nested.length
        ? nested.map((nest, index) => {
          return index == (nested.length - 1) ? `${nest} {${eol}${withPseudo}${eol}}` : `${nest}{${eol}`
        }).join(`${eol}}`)
        : `${withPseudo}`
    }

    return '';
  }

}