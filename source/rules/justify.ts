import {RuleKit} from "../foundation";

export const justifyProperties = [
  "normal",
  "center",
  "start",
  "end",
  "flex-start",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
  "stretch",
  "safe center",
  "unsafe center",
  "inherit",
  "initial",
  "unset",
  "left",
  "right"
]

export function justifyItemsRuleKit() {
  return new RuleKit({
    alias: 'justify-items',
    transform({value}) {
      return {'justify-items': justifyProperties.includes(value) ? value : undefined};
    }
  })
}

export function justifyContentRuleKit() {
  return new RuleKit({
    alias: 'justify',
    transform({value}) {
      return {'justify-content': justifyProperties.includes(value) ? value : undefined};
    }
  })
}