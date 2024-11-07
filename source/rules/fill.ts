import {RuleKit, ColorAssertion} from "../foundation";

export function fillColorRuleKit() {
  return new RuleKit({
    alias: 'fill',
    transform({value}) {
      return {
        'fill': ColorAssertion.isValidate(value) ? value : `var(--color-${value})`
      }
    }
  })
}
