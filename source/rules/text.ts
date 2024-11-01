import {RuleKit, RulesKit, WeightKit} from "../foundation";
import {ucFirst} from "../utils";
import {camelCase} from "@protorians/core";

export function textRuleKit() {
  return new RuleKit({
    alias: 'text',
    transform({value}) {
      switch (value.trim().toLowerCase()) {
        case '100':
        case '200':
        case '300':
        case '400':
        case '500':
        case '600':
        case '700':
        case '800':
        case '900':
          return {fontWeight: value,}

        case 'start':
        case 'end':
        case 'left':
        case 'center':
        case 'right':
        case 'justify':
          return {textAlign: value}

        case 'upper':
        case 'lower':
        case 'cap':
          return {textTransform: value}

        default:
          const sizing = RulesKit.getSize(value)
          const weight = ucFirst(camelCase(value).replace(/[-]/g, ''));

          if (sizing) {
            return {fontSize: sizing};
          } else if (weight in WeightKit) {
            return {fontWeight: WeightKit[weight],}
          } else return {fontSize: value,}
      }
    }
  })
}
