import {IRuleKitSyntheticValues, IStyleSheetDeclaration} from "../types";


export class StyleSheetKit {

  static create(declaration: IStyleSheetDeclaration) {

    console.log('style declaration', declaration);

  }

  static attached(selector: string) {
    return document.querySelector<HTMLStyleElement>(`style[stylesheet\\:attach='${selector}']`)
  }

  static attachInline(selector: string, property: string, value: IRuleKitSyntheticValues) {
    const exists = this.attached(selector);
    if (exists) return exists;

    const stylesheet = document.createElement("style");
    stylesheet.setAttribute("stylesheet:attach", `${selector}`);

    if (typeof value !== 'object') {
      stylesheet.textContent = `${selector.replace(/:/gi, '\\:')}{ ${property}: ${value}\n }`;
    } else {

      if (typeof value.media !== 'undefined') {
        stylesheet.textContent = `@media ${value.media} { ${selector.replace(/:/gi, '\\:')}{ ${property}: ${value.value}\n }}`;
      } else if (typeof value.support !== 'undefined') {
        stylesheet.textContent = `@support ${value.support} { ${selector.replace(/:/gi, '\\:')}{ ${property}: ${value.value}\n }}`;
      } else if (typeof value.keyframe !== 'undefined') {
        stylesheet.textContent = `@keyframe ${value.keyframe} { ${selector.replace(/:/gi, '\\:')}{ ${property}: ${value.value}\n }}`;
      } else if (typeof value.layer !== 'undefined') {
        stylesheet.textContent = `@layer ${value.layer} { ${selector.replace(/:/gi, '\\:')}{ ${property}: ${value.value}\n }}`;
      }

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
      payload[payload.length] = `${prefix || ''}${property}: ${value};`
    )
    payload[payload.length] = `}`;
    payload[payload.length] = `}`;

    stylesheet.innerHTML = `${stylesheet.innerHTML}\n${payload.join('\n')}`;
    document.head.appendChild(stylesheet);
    return stylesheet;
  }

}