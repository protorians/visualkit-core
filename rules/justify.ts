import {AliasRuleKit} from "../supports";

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
  return new AliasRuleKit({
    alias: 'justify-items',
    property: 'justify-items',
    transform({value}) {
      return justifyProperties.includes(value) ? value : undefined;
    }
  })
}

export function justifyContentRuleKit() {
  return new AliasRuleKit({
    alias: 'justify',
    property: 'justify-content',
    transform({value}) {
      return justifyProperties.includes(value) ? value : undefined;
    }
  })
}