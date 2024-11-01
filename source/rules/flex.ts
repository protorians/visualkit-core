import {RuleKit} from "../foundation";

export function flexboxRuleKit() {
  return new RuleKit({
    alias: 'flex',
    transform({value}) {
      switch (value.trim().toLowerCase()) {

        case 'fill':
          return {flex: '1 1 auto'}

        case 'center':
          return {justifyContent: 'center', alignItems: 'center',}

        case 'wrap':
        case 'no-wrap':
          return {flexWrap: value,}

        case 'row':
        case 'row-reverse':
        case 'column':
        case 'column-reverse':
          return {display: "flex", flexDirection: value,}

        default:
          return {}

      }
    }
  })
}
