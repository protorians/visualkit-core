import {
  WidgetNode,
  type IAttributes,
  type IAttributesScope,
  decamelize
} from "@protorians/widgets";
import type {IAbilitiesKit, IKit, IKitAbility, IKitChildren, IKitEntries, KitSchematic} from "../types"
import {type IProperty, type IPropertyScheme, Property} from "@protorians/core";


export class Kits {

  protected static _entries: IKitEntries = {};

  public static get list(): IKitEntries {
    return this._entries;
  }

  public static define<Attributes>(
    name: string,
    plugin: KitSchematic<Attributes>
  ): typeof Kits {
    if (!this.defined(name)) {
      this._entries[name] = plugin;
    }
    return this;
  }

  public static override<Attributes>(
    name: string,
    plugin: KitSchematic<Attributes>
  ): typeof Kits {
    this._entries[name] = plugin;
    return this;
  }

  public static use<Attributes>(
    name: string,
    parameters?: Attributes,
  ): IKit {
    if (!this.defined(name)) {
      throw new Error(`[Kit] : ${name} not found`);
    }

    const entry = this._entries[name] as KitSchematic<Attributes>;
    const kit = (new Kit(entry.main(parameters || {} as Attributes) as IAttributesScope<IAttributes, HTMLElement>, entry.tag as string,))

    return kit.className(`kit:${decamelize(name)}`);

  }

  public static defined(name: string): boolean {
    return name in this._entries && typeof this._entries[name] !== 'undefined';
  }

  public static remove(name: string): boolean {
    if (this.defined(name)) {
      this._entries[name] = undefined;
      return true;
    }
    return false;
  }

}

export class Kit
  extends WidgetNode<IAttributes, HTMLElement>
  implements IKit {
  // construct() {}
}

export class AbilitiesKit<P extends IPropertyScheme> implements IAbilitiesKit<P> {

  static abilities: IKitChildren<any> = {} as IKitChildren<any>;

  static context<Props extends Object>(props: Props) {
    const prepared = this.prepare<Props>(props);
    return (
      ('ability' in props && typeof props.ability == 'function')
        ? props.ability(new this(prepared as IPropertyScheme)) as InstanceType<typeof this>
        : new this(prepared as IPropertyScheme)
    );
  }

  static prepare<Props>(props: object): Omit<Props, 'ability'> {
    const properties = {} as Omit<Props, 'ability'>

    Object.entries(props)
      .forEach(([key, value]) => {
        if (key !== "ability") properties[key as keyof Omit<Props, 'ability'>] = value as Omit<Props, 'ability'>[keyof Omit<Props, 'ability'>]
      })

    return properties;
  }

  property: IProperty<P>;

  constructor(
    protected readonly props: P,
  ) {
    this.property = new Property(props);
    this.initialize();
  }

  initialize(): void {
  }

  bind<T extends keyof P>(index: T, widget: IKitAbility): this {

    this.property.setter(({prop, value}) => {

      if (prop in this.props && prop === index) {
        const ability = (this.constructor as typeof AbilitiesKit).abilities[prop] || undefined
        if (typeof ability === 'function') ability({value, widget,})
      }
      return value;
    })

    return this;
  }

}


export function Ability() {
  return function (target: any, method: string) {
    console.log('Child Decoration', target, method);
    target.abilities[method] = target[method];
  }
}


export function defineKit<Attributes>(
  schematic: KitSchematic<Attributes>
): typeof Kits {
  return Kits.define<Attributes>(schematic.identifier, schematic);
}

export function overrideKit<Attributes>(
  schematic: KitSchematic<Attributes>
): typeof Kits {
  return Kits.override<Attributes>(schematic.identifier, schematic);
}

export function useKit<Attributes>(
  name: string,
  parameter?: Attributes
): IKit {
  return Kits.use<Attributes>(name, parameter);
}

export function hasKit(name: string): boolean {
  return Kits.defined(name);
}

export function removeKit(name: string): boolean {
  return Kits.remove(name);
}
