import {RuleKit} from "../foundation";

export function opacityRuleKit() {
  return new RuleKit({
    alias: 'o',
    transform({value}) {
      return !isNaN(parseInt(value)) ? {'opacity': value,} : {}
    }
  })
}
