import {ConfigKit} from "./config";
import {$, RuleKit, RulesKit, StyleSheetKit} from "./index";
import {IRuleKitSyntheticValues} from "../types";



export class Analyzer {

  protected _mutations: MutationRecord[] = []

  get mutations() {
    return this._mutations;
  }

  provides(mutations: MutationRecord[]) {
    this._mutations = mutations;
    return this;
  }

  parse() {
    const rules: RuleKit<any>[] = ConfigKit.schematic.rules || [];

    for (let index in rules) {
      const rule: RuleKit<any> = rules[index];

      for (let mutation of this._mutations) {
        if (mutation.target instanceof HTMLElement) {

          $<HTMLElement>(rule.query, mutation.target)
            .forEach(target => {
              const rex = new RegExp(rule.expression, 'g');
              const matches = [...target.className.matchAll(rex)]

              matches.forEach(match => {
                let value: IRuleKitSyntheticValues = (`${match[1] || match[0]}`);
                let selector: string = `.${match[0]}`;
                let property: string | undefined = rule.property || undefined;

                if (StyleSheetKit.attached(selector)) return;

                if (!property && match[1]) {
                  const nestedRule = RulesKit.get(match[1]);
                  property = nestedRule?.property;

                  if (property) {
                    value = nestedRule?.value({
                      target,
                      property,
                      selector,
                      value: (`${match[2] || match[1]}`),
                    })
                  }
                }

                if (property) {
                  value = rule.value({
                    target,
                    property,
                    selector,
                    value: `${value}`,
                  }) || match[1];
                }

                if (property) StyleSheetKit.attachInline(selector, property, value)

              })

            })

        }
      }

    }

    return this;
  }

}