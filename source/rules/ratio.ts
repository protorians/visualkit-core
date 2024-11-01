import {RuleKit} from "../foundation";

export const aspectRatioProperties = {
  "square" : "1/1",
  "x" : "4/3",
  "y" : "3/4",
  "x-hd" : "19/9",
  "y-hd" : "9/19",
  "x-ga" : "16/10",
  "y-ga" : "10/16",
  "x-desktop" : "136.6/76.8",
  "y-desktop" : "76.8/136.6",
  "x-tablet" : "102.4/76.8",
  "y-tablet" : "76.8/102.4",
  "x-mobile" : "80/36",
  "y-mobile" : "36/80",
  "inherit" : "inherit",
  "unset" : "unset",
}

export function ratioRuleKit() {
  return new RuleKit({
    alias: 'ratio',
    transform({value}) {
      return {aspectRatio: value in aspectRatioProperties ? aspectRatioProperties[value] : value,}
    }
  })
}
