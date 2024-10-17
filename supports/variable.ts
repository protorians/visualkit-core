export class ThemeVariableKit {

  static set(name: string, value: string): typeof this {
    VariableKit.set(`--theme-${name}`, value);
    return this;
  }

  static get(name: string): string | undefined {
    return VariableKit.get(`--theme-${name}`);
  }

  static remove(name: string, target?: HTMLElement): typeof this {
    VariableKit.remove(`--theme-${name}`, target);
    return this;
  }

}

export class ColorVariableKit {

  static set(name: string, value: string, target?: HTMLElement): typeof this {
    VariableKit.set(`--color-${name}`, value, target);
    return this;
  }

  static get(name: string, target?: HTMLElement): string | undefined {
    return VariableKit.get(`--color-${name}`, target);
  }

  static remove(name: string, target?: HTMLElement): typeof this {
    VariableKit.remove(`--color-${name}`, target);
    return this;
  }

}


export class VariableKit {

  static set(property: string, value: string, target?: HTMLElement): typeof this {
    (target || document.documentElement).style.setProperty(property, value)
    return this;
  }

  static remove(property: string, target?: HTMLElement): typeof this {
    (target || document.documentElement).style.removeProperty(property)
    return this;
  }

  static get(property: string, target?: HTMLElement): string | undefined {
    return (typeof window != 'undefined' && typeof window.getComputedStyle != 'undefined') ? window.getComputedStyle(target || document.body).getPropertyValue(property) : undefined;
  }

  // static bind(target: HTMLElement, kit: string, parameters: string | string[] = []): typeof this {
  //   target.className = [`kit:${kit}`, `${Array.isArray(parameters) ? parameters.join(' ') : parameters});`].join(' ');
  //   return this;
  // }

}
