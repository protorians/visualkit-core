import {ConfigKit} from "./config";
import {VisualKitException} from "./exception";
import type {IRuleKit, IRuleKitPayload, IRuleKitProps, IRuleKitSyntheticValues} from "../types";


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

// export class NamespaceRuleKit extends RuleKit {
//
//   get name(): string {
//     return (this.props.namespace || this.props.alias) as string;
//   };
//
//   get query(): string {
//     return `[class^="${this.props.namespace}\:\:"], [class*=" ${this.props.namespace}\:\:"]`;
//   }
//
//   get pattern(): string {
//     return `(?<!:)${this.props.namespace}::(.[a-zA-Z0-9]*):(.[a-zA-Z0-9-#_]*)`;
//   }
//
//   value(payload: IRuleKitPayload): IRuleKitSyntheticValues {
//     return this.props.transform(payload);
//   }
//
// }



// export class AliasRuleKit extends RuleKit<IAliasRule> {
//
//   get name(): string {
//     return this.parameter.alias;
//   };
//
//   get query(): string {
//     return `[class^="${this.parameter.alias}\:"], [class*=" ${this.parameter.alias}\:"]`;
//   }
//
//   get expression(): string {
//     return `(?<!:)${this.parameter.alias}:(.[a-zA-Z0-9-#_]*)`;
//   }
//
//   get property(): string {
//     return this.parameter.property || this.parameter.alias;
//   }
//
//   value(payload: IRuleKitPayload): IRuleKitSyntheticValues {
//     return this.parameter.transform(payload);
//   }
//
// }
//
//

//
//
// export class ComposingRuleKit extends RuleKit<IComposingRule> {
//
//   get name(): string {
//     return this.parameter.alias;
//   };
//
//   get query(): string {
//     return `[class^="${this.parameter.alias}\:"], [class*=" ${this.parameter.alias}\:"]`;
//   }
//
//   get expression(): string {
//     return `(?<!:)${this.parameter.alias}:(.[a-zA-Z0-9-#_]*)`;
//   }
//
//   value(payload: IRuleKitPayload): IRuleKitSyntheticValues {
//     return this.parameter.transform(payload);
//   }
//
// }

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

  static sizes() {
    return ConfigKit.schematic.sizes;
  }

  static getSize(key: string): string | undefined {
    if (!(ConfigKit.schematic.sizes)) throw new VisualKitException('[RulesKit] no sizes collection defined')
    key = key.toUpperCase()
    return ConfigKit.schematic.sizes[key] || undefined;
  }


}