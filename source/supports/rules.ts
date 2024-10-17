import {ConfigKit} from "./config";
import {VisualKitException} from "./exception";
import {IAliasRule, INamespaceRule, IRuleKit, IRuleKitPayload, IRuleKitSyntheticValues} from "../types";
import {IParameters} from "@protorians/widgets";

export class RuleKit<P extends IParameters> implements IRuleKit<P> {

  get name(): string {
    return "ruleKit";
  };

  get query(): string {
    return '';
  }

  get expression(): string {
    return '';
  }

  get property(): string | undefined {
    return undefined;
  }

  constructor(public readonly parameter: P) {
  }

  value(payload: IRuleKitPayload): IRuleKitSyntheticValues {
    return payload.value;
  }

}

export class AliasRuleKit extends RuleKit<IAliasRule> {

  get name(): string {
    return this.parameter.alias;
  };

  get query(): string {
    return `[class^="${this.parameter.alias}\:"], [class*=" ${this.parameter.alias}\:"]`;
  }

  get expression(): string {
    return `(?<!:)${this.parameter.alias}:(.[a-zA-Z0-9-#_]*)`;
  }

  get property(): string {
    return this.parameter.property || this.parameter.alias;
  }

  value(payload: IRuleKitPayload): IRuleKitSyntheticValues {
    return this.parameter.transform(payload);
  }

}


export class NamespaceRuleKit extends RuleKit<INamespaceRule> {

  get name(): string {
    return this.parameter.namespace;
  };

  get query(): string {
    return `[class^="${this.parameter.namespace}\:\:"], [class*=" ${this.parameter.namespace}\:\:"]`;
  }

  get expression(): string {
    return `(?<!:)${this.parameter.namespace}::(.[a-zA-Z0-9]*):(.[a-zA-Z0-9-#_]*)`;
  }

  value(payload: IRuleKitPayload): IRuleKitSyntheticValues {
    return this.parameter.transform(payload);
  }

}

export class RulesKit {

  static get(name: string): IRuleKit<any> | undefined {
    return (ConfigKit.schematic.rules || [])
      .filter((rule: RuleKit<any>) => rule.name === name)[0] || undefined;
  }

  static set(rule: IRuleKit<any>): typeof this {
    ConfigKit.schematic.rules = ConfigKit.schematic.rules || [];
    ConfigKit.schematic.rules.push(rule);
    return this;
  }

  static sizes(){
    return ConfigKit.schematic.sizes;
  }

  static getSize(key: string): string | undefined {
    if (!(ConfigKit.schematic.sizes)) throw new VisualKitException('[DirectiveKit] no sizes collection defined')
    key = key.toUpperCase()
    return ConfigKit.schematic.sizes[key] || undefined;
  }



}