import {RuleKit} from "../foundation";

export function flexboxRuleKit() {
  return new RuleKit({
    alias: 'flex',
    transform({value}) {
      return {
        display: "flex",
        flexDirection: `${value || 'row'}`,
      };
    }
  })
}
