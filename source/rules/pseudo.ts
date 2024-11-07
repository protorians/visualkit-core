import {RuleKit} from "../foundation";
import {IRuleKit} from "../types";

export const pseudoClassesList: { [K: string]: string } = {
  "active": ":active",
  "any-link": ":any-link",
  "blank": ":blank",
  "checked": ":checked",
  "current": ":current",
  "default": ":default",
  "defined": ":defined",
  "dir": ":dir()",
  "disabled": ":disabled",
  "drop": ":drop",
  "empty": ":empty",
  "enabled": ":enabled",
  "first": ":first",
  "first-child": ":first-child",
  "first-of-type": ":first-of-type",
  "fullscreen": ":fullscreen",
  "future": ":future",
  "focus": ":focus",
  "focus-visible": ":focus-visible",
  "focus-within": ":focus-within",
  "has": ":has()",
  "host": ":host",
  "host-context": ":host-context()",
  "hover": ":hover",
  "indeterminate": ":indeterminate",
  "in-range": ":in-range",
  "invalid": ":invalid",
  "is": ":is()",
  "lang": ":lang()",
  "last-child": ":last-child",
  "last-of-type": ":last-of-type",
  "left": ":left",
  "link": ":link",
  "local-link": ":local-link",
  "not": ":not()",
  "nth-child": ":nth-child()",
  "nth-col": ":nth-col()",
  "nth-last-child": ":nth-last-child()",
  "nth-last-col": ":nth-last-col()",
  "nth-last-of-type": ":nth-last-of-type()",
  "nth-of-type": ":nth-of-type()",
  "only-child": ":only-child",
  "only-of-type": ":only-of-type",
  "optional": ":optional",
  "out-of-range": ":out-of-range",
  "past": ":past",
  "placeholder-shown": ":placeholder-shown",
  "read-only": ":read-only",
  "read-write": ":read-write",
  "required": ":required",
  "right": ":right",
  "root": ":root",
  "scope": ":scope",
  "target": ":target",
  "target-within": ":target-within",
  "user-invalid": ":user-invalid",
  "valid": ":valid",
  "visited": ":visited",
  "where": ":where()"
}

export function pseudoClassesRuleKit(): IRuleKit[] {
  return Object.entries(pseudoClassesList)
    .map(([key, pseudo]) => {
      const matches = [...pseudo.matchAll(/(.[a-zA-Z0-9-#_]*)\(\)/g)]
      return new RuleKit({
        namespace: key,
        transform({value}) {
          return {'@pseudo': matches.length ? `${matches[0][1]}(${value})` : `${pseudo}`,};
        }
      })
    })
}
