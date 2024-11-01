import {RuleKit, RulesKit} from "../foundation";

export function marginRuleKit() {
  return new RuleKit({
    alias: 'm',
    transform({value}) {
      return {margin: RulesKit.getSize(value) || value};
    }
  })
}



export function marginXRuleKit() {
  return new RuleKit({
    alias: 'm-x',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        marginLeft: val,
        marginRight: val,
      };
    }
  })
}

export function marginYRuleKit() {
  return new RuleKit({
    alias: 'm-y',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        marginTop: val,
        marginBottom: val,
      };
    }
  })
}

export function marginTopRuleKit() {
  return new RuleKit({
    alias: 'm-t',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        marginTop: val,
      };
    }
  })
}

export function marginRightRuleKit() {
  return new RuleKit({
    alias: 'm-r',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        marginRight: val,
      };
    }
  })
}

export function marginBottomRuleKit() {
  return new RuleKit({
    alias: 'm-b',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        marginBottom: val,
      };
    }
  })
}

export function marginLeftRuleKit() {
  return new RuleKit({
    alias: 'm-l',
    transform({value}) {
      const val = RulesKit.getSize(value) || value
      return {
        marginLeft: val,
      };
    }
  })
}
