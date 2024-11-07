import type {IRuleKit} from "../types";
import {
  paddingBottomRuleKit,
  paddingLeftRuleKit,
  paddingRightRuleKit,
  paddingRuleKit,
  paddingTopRuleKit,
  paddingXRuleKit,
  paddingYRuleKit
} from "../rules/padding";
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
import {
  marginBottomRuleKit,
  marginLeftRuleKit,
  marginRightRuleKit,
  marginRuleKit,
  marginTopRuleKit,
  marginXRuleKit,
  marginYRuleKit
} from "../rules/margin";
import {rowRuleKit} from "../rules/row";
import {fitObjectRuleKit} from "../rules/fit";
import {heightRuleKit} from "../rules/height";
import {widthRuleKit} from "../rules/width";
import {opacityRuleKit} from "../rules/opacity";
import {ratioRuleKit} from "../rules/ratio";
import {borderRadiusRuleKit} from "../rules/rounded";
import {textRuleKit} from "../rules/text";
import {fillColorRuleKit} from "../rules/fill";
import {strokeColorRuleKit} from "../rules/stroke";
import {columnGapRuleKit, gapRuleKit, rowGapRuleKit} from "../rules/gap";
import {pseudoClassesRuleKit} from "../rules/pseudo";

export function rulesKitPack(): IRuleKit[] {
  return [
    ...pseudoClassesRuleKit(),

    flexboxRuleKit(),
    paddingRuleKit(),
    paddingXRuleKit(),
    paddingYRuleKit(),
    paddingTopRuleKit(),
    paddingRightRuleKit(),
    paddingBottomRuleKit(),
    paddingLeftRuleKit(),
    marginRuleKit(),
    marginXRuleKit(),
    marginYRuleKit(),
    marginTopRuleKit(),
    marginRightRuleKit(),
    marginBottomRuleKit(),
    marginLeftRuleKit(),
    alignItemsRuleKit(),
    alignContentRuleKit(),
    justifyContentRuleKit(),
    justifyItemsRuleKit(),
    foreColorRuleKit(),
    backColorRuleKit(),
    columnsRuleKit(),
    rowRuleKit(),
    fitObjectRuleKit(),
    heightRuleKit(),
    widthRuleKit(),
    opacityRuleKit(),
    ratioRuleKit(),
    borderRadiusRuleKit(),
    textRuleKit(),
    strokeColorRuleKit(),
    fillColorRuleKit(),
    gapRuleKit(),
    rowGapRuleKit(),
    columnGapRuleKit(),

    nsMiniPhoneRuleKit(),
    nsPhoneRuleKit(),
    nsTabletRuleKit(),
    nsLaptopRuleKit(),
    nsDesktopRuleKit(),
    nsTvRuleKit(),
  ]
}