import {RuleKit} from "../foundation";

export function opacityRuleKit() {
  return new RuleKit({
    alias: 'opacity',
    transform({value}) {
      const val = parseInt(value)
      return !isNaN(val) ? {'opacity': `${val / 100}`,} : {}
    }
  })
}
