import {IBuilderKit, IExcavationKit, IRuleKitSyntheticValues} from "../types";
import {ConfigKit} from "./config";
import {BuilderKit} from "./builder";
import {RuleKit, RulesKit,} from "./rules";
import {Collection} from "../utils";
import * as process from "node:process";


export class ExcavationKit implements IExcavationKit {

  static WIDGET_REGEX = /className:\s*([^,]*)/gm;

  static HTML_REGEX = /class="([^"]*)"/gm;

  static QUOTES_ONLY = /['"`]([^'"`]*)['"`]/g;

  static EXTENSIONS: string[] = ['js', 'ts', 'json', 'html', 'htm', 'txt', 'svg',]

  matches: RegExpExecArray[] = [];

  builder: IBuilderKit;

  get hostExtension(): string {
    const explode = this.provider.split('.')
    return explode[explode.length - 1] || explode[0];
  }

  get accepted(): boolean {
    return ExcavationKit.EXTENSIONS.includes(this.hostExtension)
  }

  constructor(public readonly provider: string) {
    this.builder = new BuilderKit;
  }

  begin(): typeof this {
    BuilderKit.begin(this.provider)
    return this;
  }

  close(): typeof this {
    BuilderKit.close(this.provider)
    return this;
  }

  source(source: string): this {
    ([...source.matchAll(ExcavationKit.WIDGET_REGEX)]
      .map(match => this.matches = [...this.matches, ...(match[1].matchAll(ExcavationKit.QUOTES_ONLY))]))
    return this
  }

  htmlSource(source: string): this {
    this.matches = [...this.matches, ...source.matchAll(ExcavationKit.HTML_REGEX)]
    return this;
  }

  load(): string {
    return this.builder.load(this.provider)
  }

  resolve(selector: string, sequences: string[], value: string): IRuleKitSyntheticValues {
    let properties: IRuleKitSyntheticValues = {}

    if (ConfigKit.schematic.rules) {

      for (let index = 0; index < sequences.length; index++) {
        const matches = [...(sequences[index]).matchAll(/(.[a-zA-Z0-9-#_]*)\((.*)\)/g)];
        const match = ((matches.length) ? matches[0][1] : undefined) || (sequences[index]);
        const sequence = RulesKit.get(match);

        if (sequence instanceof RuleKit) {
          properties = {
            ...(properties),
            ...(sequence?.props.transform({ value: ((matches.length) ? matches[0][2] : undefined) || value, selector,}) || {})
          }
        }
      }
    }

    return properties;
  }

  make(): this {
    const root = ConfigKit.schematic.build?.directories?.root || process.cwd();

    for (let classNames of this.matches.map(m => m[1])) {
      classNames.split(' ')
        .filter(v => v.trim().length)
        .forEach(className => {
          const selector = `.${className}`
          const searchAlias = className.split(':')
          const searchNamespace = className.split('::')
          let properties: IRuleKitSyntheticValues = {}

          if (searchNamespace.length > 1) {
            const refactor = Collection.refactor(searchNamespace, 0, searchNamespace.length - 2);
            const split = (searchNamespace[searchNamespace.length - 1]).split(':')
            refactor.push(split[0])
            properties = this.resolve(selector, refactor, split[1] || '')
          } else if (searchAlias.length) {
            properties = this.resolve(selector, [searchAlias[0]], searchAlias[1])
          }

          this.builder.push({selector, properties,}, !this.provider.startsWith(root))
        })
    }

    this.builder.generate(this.provider)
    return this;
  }


}