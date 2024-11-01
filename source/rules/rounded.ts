import {RuleKit, RulesKit} from "../foundation";

export function borderRadiusRuleKit() {
  return new RuleKit({
    alias: 'rounded',
    transform({value}) {
      return {borderRadius: RulesKit.getSize(value) || value};
    }
  })
}
