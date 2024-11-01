import {RuleKit, ColorAssertion} from "../foundation";

export function backColorRuleKit() {
  return new RuleKit({
    alias: 'back',
    transform({value}) {
      return {
        'background-color': ColorAssertion.isValidate(value) ? value : `var(--color-${value})`
        // 'background-color': ColorVariableKit.get(value) ? `var(--color-${value})` : (ColorAssertion.validateHex(value) ? value : undefined)
      };
    }
  })
}
