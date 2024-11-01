import {RuleKit, ScreenKit} from "../foundation";

export function rowRuleKit() {
  return new RuleKit({
    alias: 'row',
    transform({value}) {
      return {
        height: `${parseInt(value) / ScreenKit.divider}`,
      };
    }
  })
}
