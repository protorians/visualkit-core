import {RuleKit, ScreenKit} from "../foundation";

export function columnsRuleKit() {
  return new RuleKit({
    alias: 'col',
    transform({value}) {
      return {
        width: `${parseInt(value) / ScreenKit.divider}`,
      };
    }
  })
}
