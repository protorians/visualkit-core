import {RuleKit, ColorAssertion} from "../foundation";

export function foreColorRuleKit() {
  return new RuleKit({
    alias: 'fore',
    transform({value}) {
      return {
        'color': ColorAssertion.isValidate(value) ? value : `var(--color-${value})`
        // 'color': ColorVariableKit.get(value) ? `var(--color-${value})` : (ColorAssertion.validateHex(value) ? value : undefined)
      }
    }
  })
}
