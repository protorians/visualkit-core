import {RuleKit, RulesKit} from "../foundation";

export function paddingRuleKit() {
  return new RuleKit({
    alias: 'p',
    transform({value}) {
      return {padding: RulesKit.getSize(value) || value};
    }
  })
}

export function paddingXRuleKit() {
  return new RuleKit({
    alias: 'p-x',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        paddingLeft: val,
        paddingRight: val,
      };
    }
  })
}

export function paddingYRuleKit() {
  return new RuleKit({
    alias: 'p-y',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        paddingTop: val,
        paddingBottom: val,
      };
    }
  })
}

export function paddingTopRuleKit() {
  return new RuleKit({
    alias: 'p-t',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        paddingTop: val,
      };
    }
  })
}

export function paddingRightRuleKit() {
  return new RuleKit({
    alias: 'p-r',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        paddingRight: val,
      };
    }
  })
}

export function paddingBottomRuleKit() {
  return new RuleKit({
    alias: 'p-b',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        paddingBottom: val,
      };
    }
  })
}

export function paddingLeftRuleKit() {
  return new RuleKit({
    alias: 'p-l',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        paddingLeft: val,
      };
    }
  })
}
