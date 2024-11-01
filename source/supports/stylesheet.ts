import type {IRuleKitSyntheticValues, IStyleProps, IStyleSheetDeclarations} from "../types";
import {StyleKit} from "./style";
import {slugify} from "@protorians/core";
import {decamelize} from "@protorians/widgets";


export class StyleSheetKit {

  static create(declarations: IStyleSheetDeclarations): StyleSheetKit {
    return new this(declarations)
  }

  static attached(selector: string) {
    return document.querySelector<HTMLStyleElement>(`style[stylesheet\\:attach='${selector}']`)
  }

  static attachInline(selector: string, property: string, value: IRuleKitSyntheticValues) {
    const exists = this.attached(selector);
    if (exists) return exists;

    const stylesheet = document.createElement("style");
    stylesheet.setAttribute("stylesheet:attach", `${selector}`);

    property = decamelize(property);

    if (typeof value !== 'object') {
      stylesheet.textContent = `${selector.replace(/:/gi, '\\:')}{ ${(property)}: ${value}\n }`;
    } else {

      // if (typeof value == 'object') {
      //   if ('media' in value && typeof value.media !== 'undefined') {
      //     stylesheet.textContent = `@media ${value.media} { ${selector.replace(/:/gi, '\\:')}{ ${(property)}: ${value.value}\n }}`;
      //   } else if ('support' in value && typeof value.support !== 'undefined') {
      //     stylesheet.textContent = `@support ${value.support} { ${selector.replace(/:/gi, '\\:')}{ ${(property)}: ${value.value}\n }}`;
      //   } else if ('keyframe' in value && typeof value.keyframe !== 'undefined') {
      //     stylesheet.textContent = `@keyframe ${value.keyframe} { ${selector.replace(/:/gi, '\\:')}{ ${(property)}: ${value.value}\n }}`;
      //   } else if ('layer' in value && typeof value.layer !== 'undefined') {
      //     stylesheet.textContent = `@layer ${value.layer} { ${selector.replace(/:/gi, '\\:')}{ ${(property)}: ${value.value}\n }}`;
      //   }
      // }

    }
    document.head.appendChild(stylesheet);
    return stylesheet;
  }

  static attach(index: string, selector: string, properties: [string, (string | number)][], prefix?: string, layer?: string) {
    const payload: string[] = []
    const stylesheet = this.attached(index) || document.createElement("style");
    stylesheet.setAttribute("stylesheet:attach", `${index}`);

    payload[payload.length] = `@layer ${(layer || 'visualkit').toLowerCase()}{`;
    payload[payload.length] = `${selector.replace(/:/gi, '\\:')}{`;
    properties.forEach(([property, value]) =>
      payload[payload.length] = `${prefix || ''}${decamelize(property)}: ${value};`
    )
    payload[payload.length] = `}`;
    payload[payload.length] = `}`;

    stylesheet.innerHTML = `${payload.join('\n')}`;
    document.head.appendChild(stylesheet);
    return stylesheet;
  }

  constructor(
    public readonly declarations: IStyleSheetDeclarations,
    public readonly layer: string = 'theme',
  ) {
  }

  render() {

    Object.entries(this.declarations).forEach(([selector, properties]) => {

      const id = slugify(selector)
      const declarations = (properties instanceof StyleKit)
        ? properties
        : new StyleKit(properties as Partial<IStyleProps>);
      const build = declarations.build()
      // const element = StyleSheetKit.attach(id, selector, build, '', this.layer)

      console.log('stylesheet.render', id, build, selector,);

    })

  }

}