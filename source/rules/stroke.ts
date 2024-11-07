import {RuleKit, ColorAssertion} from "../foundation";

export function strokeColorRuleKit() {
  return new RuleKit({
    alias: 'stroke',
    transform({value}) {
      return {
        'stroke': ColorAssertion.isValidate(value) ? value : `var(--color-${value})`
      }
    }
  })
}
