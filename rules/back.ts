import {AliasRuleKit, ColorVariableKit} from "../supports";
import {ColorKit} from "../supports/colors";

export function backColorRuleKit() {
  return new AliasRuleKit({
    alias: 'back',
    property: 'background-color',
    transform({value}) {
      return ColorVariableKit.get(value) ? `var(--color-${value})` : (ColorKit.validate(value) ? value : undefined);
    }
  })
}
