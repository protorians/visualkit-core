import {RuleKit, RulesKit} from "../foundation";

export function gapRuleKit() {
  return new RuleKit({
    alias: 'gap',
    transform({value}) {
      return {
        gap: RulesKit.getSize(value) || value,
      };
    }
  })
}

export function rowGapRuleKit() {
  return new RuleKit({
    alias: 'gap-y',
    transform({value}) {
      return {
        rowGap: RulesKit.getSize(value) || value,
      };
    }
  })
}

export function columnGapRuleKit() {
  return new RuleKit({
    alias: 'gap-x',
    transform({value}) {
      return {
        columnGap: RulesKit.getSize(value) || value,
      };
    }
  })
}
