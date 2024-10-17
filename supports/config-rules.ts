import {IRuleKit} from "../types";
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
} from "../rules/ns.screen.size";

export function baseRulesKit(): IRuleKit<any>[] {
  return [
    paddingRuleKit(),
    alignItemsRuleKit(),
    alignContentRuleKit(),
    justifyContentRuleKit(),
    justifyItemsRuleKit(),
    foreColorRuleKit(),
    backColorRuleKit(),

    nsMiniPhoneRuleKit(),
    nsPhoneRuleKit(),
    nsTabletRuleKit(),
    nsLaptopRuleKit(),
    nsDesktopRuleKit(),
    nsTvRuleKit(),
  ]
}