import {AliasRuleKit} from "../supports";

export const alignProperties = [
  "normal",
  "center",
  "start",
  "end",
  "flex-start",
  "flex-end",
  "stretch",
  "safe center",
  "unsafe center",
  "self-start",
  "self-end",
  "baseline",
  "first baseline",
  "last baseline",
  "revert",
  "revert-layer",
  "inherit",
  "initial",
  "unset",
]

export function alignItemsRuleKit() {
  return new AliasRuleKit({
    alias: 'align',
    property: 'align-items',
    transform({value}) {
      return alignProperties.includes(value) ? value : undefined;
    }
  })
}

export function alignContentRuleKit() {
  return new AliasRuleKit({
    alias: 'align-content',
    property: 'align-content',
    transform({value}) {
      return alignProperties.includes(value) ? value : undefined;
    }
  })
}