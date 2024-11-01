import {RuleKit, RulesKit} from "../foundation";

export function heightRuleKit() {
  return new RuleKit({
    alias: 'h',
    transform({value}) {
      return {
        'height': RulesKit.getSize(value) || value,
      }
    }
  })
}
