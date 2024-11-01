import {ConfigKit} from "./config";
import {VisualKitException} from "./exception";
import type {ICustomSize, IRuleKit, IRuleKitPayload, IRuleKitProps, IRuleKitSyntheticValues, ISize} from "../types";


export class RuleKit implements IRuleKit {

  get name(): string {
    return "ruleKit";
  };

  get query(): string {
    return `[class^="${this.props.alias}\:"], [class*=" ${this.props.alias}\:"]`;
  }

  get alias(): string {
    return `(?<!:)${this.props.alias}:(.[a-zA-Z0-9-#_]*)`;
  }

  get ns(): string {
    return `(?<!:)${this.props.namespace}::(.[a-zA-Z0-9]*):(.[a-zA-Z0-9-#_]*)`;
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
      .filter((rule: RuleKit) => rule.props.alias === name)[0] || undefined;
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