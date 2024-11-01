import {RuleKit} from "../foundation";

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
  return new RuleKit({
    alias: 'align',
    transform({value}) {
      return {'align-items': alignProperties.includes(value) ? value : undefined};
    }
  })
}

export function alignContentRuleKit() {
  return new RuleKit({
    alias: 'align-content',
    transform({value}) {
      return {'align-content': alignProperties.includes(value) ? value : undefined};
    }
  })
}