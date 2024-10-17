import {ColorKit} from "../supports/colors";
import {AliasRuleKit, ColorVariableKit} from "../supports";


export function foreColorRuleKit() {
  return new AliasRuleKit({
    alias: 'fore',
    property: 'color',
    transform({value}) {
      return ColorVariableKit.get(value) ? `var(--color-${value})` : (ColorKit.validate(value) ? value : undefined);
    }
  })
}
