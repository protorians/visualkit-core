import type {IRuleKit} from "../types";
import {paddingRuleKit} from "../rules/padding";
import {alignContentRuleKit, alignItemsRuleKit} from "../rules/align";
import {justifyContentRuleKit, justifyItemsRuleKit} from "../rules/justify";
import {foreColorRuleKit} from "../rules/fore";
import {backColorRuleKit} from "../rules/back";
import {
  nsDesktopRuleKit,
  nsLaptopRuleKit,
  nsMiniPhoneRuleKit,
  nsPhoneRuleKit,
  nsTabletRuleKit,
  nsTvRuleKit
} from "../rules/breakpoints";
import {flexboxRuleKit} from "../rules/flex";
import {columnsRuleKit} from "../rules/column";

export function baseRulesKit(): IRuleKit[] {
  return [
    flexboxRuleKit(),
    paddingRuleKit(),
    alignItemsRuleKit(),
    alignContentRuleKit(),
    justifyContentRuleKit(),
    justifyItemsRuleKit(),
    foreColorRuleKit(),
    backColorRuleKit(),
    columnsRuleKit(),

    nsMiniPhoneRuleKit(),
    nsPhoneRuleKit(),
    nsTabletRuleKit(),
    nsLaptopRuleKit(),
    nsDesktopRuleKit(),
    nsTvRuleKit(),
  ]
}