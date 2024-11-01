import {IBuilderKit, IExcavationKit} from "../types";
import {ConfigKit} from "./config";
import type {IRuleKit} from "../types";
import {BuilderKit} from "./builder";
import {RulesKit} from "./rules";
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

  source(source: string): this {
    ([...source.matchAll(ExcavationKit.WIDGET_REGEX)]
      .map(match => this.matches = [...this.matches, ...(match[1].matchAll(ExcavationKit.QUOTES_ONLY))]))
    return this
  }

  htmlSource(source: string): this {
    this.matches = [...this.matches, ...source.matchAll(ExcavationKit.HTML_REGEX)]
    return this;
  }

  load(): string{
    return this.builder.load(this.provider)
  }

  make(): this {

    const root = ConfigKit.schematic.build?.directories?.root || process.cwd();

    for (let index in ConfigKit.schematic.rules) {
      const classNames = this.matches.map(m => m[1]).join(' ');

      if (!classNames.trim().length) continue;

      const rule: IRuleKit = ConfigKit.schematic.rules[index];
      const matches = [
        ...classNames.matchAll(new RegExp(rule.ns, 'g')),
        ...classNames.matchAll(new RegExp(rule.alias, 'g')),
      ]


      matches.forEach(match => {
        const selector: string = `.${match[0]}`;

        let properties = rule.props.transform({
          value: `${match[2] || match[1]}`,
          selector,
        })

        if (match.length == 3) {
          const affiliated = RulesKit.get(match[1]);

          if (affiliated)
            properties = {
              ...properties,
              ...(affiliated?.props.transform({value: `${match[2]}`, selector,}) || {})
            }
        }

        this.builder.push({selector, properties,}, !this.provider.startsWith(root))
      })

    }

    this.builder.generate(this.provider)

    return this;
  }


}