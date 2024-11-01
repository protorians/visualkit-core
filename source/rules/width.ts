import {RuleKit, RulesKit} from "../foundation";

export function widthRuleKit() {
  return new RuleKit({
    alias: 'w',
    transform({value}) {
      return {
        'width': RulesKit.getSize(value) || value,
      }
    }
  })
}
