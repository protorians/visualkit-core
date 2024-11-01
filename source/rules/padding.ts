import {RuleKit, RulesKit} from "../foundation";

export function paddingRuleKit() {
  return new RuleKit({
    alias: 'p',
    transform({value}) {
      return {padding: RulesKit.getSize(value) || value};
    }
  })
}
