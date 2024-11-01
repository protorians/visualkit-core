import {RuleKit} from "../foundation";

export const objectFitProperties = [
  "fill",
  "contain",
  "cover",
  "none",
  "scale-down",
  "inherit",
  "unset",
]

export function fitObjectRuleKit() {
  return new RuleKit({
    alias: 'fit',
    transform({value}) {
      return objectFitProperties.includes(value) ? {
        'object-fit': value
      } : {}
    }
  })
}
