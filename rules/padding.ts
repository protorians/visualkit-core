import {AliasRuleKit, RulesKit} from "../supports";

export function paddingRuleKit() {
  return new AliasRuleKit({
    alias: 'p',
    property: 'padding',
    transform({value}) {
      return RulesKit.getSize(value);
    }
  })
}