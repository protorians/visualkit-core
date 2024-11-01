import {IThemeSettings} from "../types";
import {ConfigKit, VisualKitException} from "../foundation";

export class ThemeKit {

  static layers: string[] = ['theme', 'feature', 'property', 'color', 'kit', 'visualkit']

  static get cacheKey(): string {
    return '@visual.kit.theme.settings'
  }

  static get settings(): IThemeSettings {
    const cache = localStorage.getItem(this.cacheKey)
    return (cache ? JSON.parse(cache) : this.default) as IThemeSettings;
  }

  static get default(): IThemeSettings {
    if (!('theme' in ConfigKit.schematic)) throw new VisualKitException('[ThemeKit] Invalid theme settings');
    return {
      name: ConfigKit.schematic.theme.name,
      palette: (ConfigKit.schematic.theme.palettes.length) ? ConfigKit.schematic.theme.palettes[0].id : undefined,
      tone: (ConfigKit.schematic.theme.tones.length) ? ConfigKit.schematic.theme.tones[0].id : undefined,
      useColorScheme: (ConfigKit.schematic.theme.useClientTone) ? ConfigKit.schematic.theme.useClientTone : undefined,
    };
  }

  static set settings(settings: IThemeSettings) {
    localStorage.setItem(this.cacheKey, JSON.stringify(settings));
  }

  static switch(name: string, target?: HTMLElement): typeof this {
    target = target || document.documentElement;
    target.setAttribute('theme:name', name);
    if (document.documentElement === target) this.settings = {...this.settings, name,};
    return this;
  }

  static palette(palette: string, target?: HTMLElement): typeof this {
    target = target || document.documentElement;
    target.setAttribute('theme:palette', palette);
    if (document.documentElement === target) this.settings = {...this.settings, palette,};
    return this;
  }

  static tone(tone: string, target?: HTMLElement): typeof this {
    target = target || document.documentElement;
    target.setAttribute('theme:tone', tone);
    if (document.documentElement === target) this.settings = {...this.settings, tone,};
    return this;
  }

  static run() {
    return this
      .initializeLayers()
      .switch(this.settings.name)
      .palette(this.settings.palette || ConfigKit.schematic.theme.palettes.length ? ConfigKit.schematic.theme.palettes[0].id : 'default')
      .tone(this.settings.tone || ConfigKit.schematic.theme.tones.length ? ConfigKit.schematic.theme.tones[0].id : 'default')
      .dynamicColorScheming(this.settings.useColorScheme || ConfigKit.schematic.theme.useClientTone)
  }

  static dynamicColorScheming(use?: boolean) {
    if (use) {
      if ('matchMedia' in window) {
        const checker = window.matchMedia(`(prefers-color-scheme: dark)`);
        checker.addEventListener('change', (e) => (e.matches) ? this.colorScheme('dark') : this.colorScheme('light'))
        if (checker.matches) this.colorScheme('dark')
        else this.colorScheme('light')
      }
    } else {
      (document.documentElement).removeAttribute('theme:color-scheme')
    }
    return this;
  }

  static colorScheme(colorScheme: string, target?: HTMLElement) {
    (target || document.documentElement)
      .setAttribute('theme:color-scheme', colorScheme.trim().toLowerCase() == 'dark' ? 'dark' : 'light')
    return this;
  }

  static initializeLayers(layers?: string[]) {
    const element = document.querySelector(`[visualkit\\:layers="integrity"]`) || document.createElement('style');

    element.setAttribute('type', 'text/css');
    element.setAttribute('visualkit:layers', 'integrity');
    element.innerHTML = `@layer ${(layers || this.layers).join(', ')};`;

    if (document.head.firstChild)
      document.head.insertBefore(element, document.head.firstChild);
    else
      document.head.appendChild(element);

    return this;
  }

}
