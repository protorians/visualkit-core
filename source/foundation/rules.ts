import {ConfigKit} from "./config";
import {VisualKitException} from "./exception";
import type {ICustomSize, IRuleKit, IRuleKitPayload, IRuleKitProps, IRuleKitSyntheticValues, ISize} from "../types";


export class RuleKit implements IRuleKit {

  get name(): string {
    return "ruleKit";
  };

  get query(): string | undefined {
    return ('alias' in this.props) ? `[class^="${this.props.alias}\:"], [class*=" ${this.props.alias}\:"]` : undefined;
  }

  get alias(): string | undefined {
    return ('alias' in this.props) ? `(?<!:)${this.props.alias}:(.[a-zA-Z0-9-#_]*)` : undefined;
  }

  get ns(): string | undefined {
    return ('namespace' in this.props) ? `(?<!:)${this.props.namespace}::(.[a-zA-Z0-9]*):(.[a-zA-Z0-9-#_]*)` : undefined;
  }

  get deep(): string | undefined {
    return ('namespace' in this.props) ? `(?<!:)${this.props.namespace}::(.[a-zA-Z0-9]*)::(.[a-zA-Z0-9-#_]*):(.[a-zA-Z0-9-#_]*)` : undefined;
  }

  constructor(public readonly props: IRuleKitProps) {
  }

  value(payload: IRuleKitPayload): IRuleKitSyntheticValues {
    return payload;
  }

  static composeProp(key: string, value: string) {
    const compose = {}

    compose[key] = value;

    return compose
  }

}

export class RulesKit {

  static get(name: string): IRuleKit | undefined {
    return (ConfigKit.schematic.rules || [])
      .filter((rule) =>{
        const alias = ('alias' in rule.props) ? rule.props.alias : undefined;
        const ns = ('namespace' in rule.props) ? rule.props.namespace : undefined;
        const n = alias || ns;
        return n === name;
      })[0] || undefined;
      // .filter((rule) => ('alias' in rule.props) ? rule.props.alias === name : (('ns' in rule.props) ? rule.props.ns === name : false))[0] || undefined;
  }

  static set(rule: IRuleKit): typeof this {
    ConfigKit.schematic.rules = ConfigKit.schematic.rules || [];
    ConfigKit.schematic.rules.push(rule);
    return this;
  }

  static sizes(): Partial<ISize> | ICustomSize | undefined {
    return ConfigKit.schematic.sizes;
  }

  static getSize(key: string): string | undefined {
    if (!(ConfigKit.schematic.sizes)) throw new VisualKitException('[RulesKit] no sizes collection defined')
    key = key.toUpperCase()
    return ConfigKit.schematic.sizes[key] || undefined;
  }


}