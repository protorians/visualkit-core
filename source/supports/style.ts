import {type IProperty, Property} from "@protorians/core";
import {IStyleKit, IStyleProps} from "../types";
import {decamelize} from "@protorians/widgets";


export class StyleKit implements IStyleKit {

  protected properties: IProperty<Partial<IStyleProps>>

  get computed(): Partial<IStyleProps> {
    return this.properties.export();
  }

  get scope(): IProperty<Partial<IStyleProps>> {
    return this.properties;
  }

  constructor(
    public initial: Partial<IStyleProps>
  ) {
    this.properties = new Property<Partial<IStyleProps>>(initial);
  }

  update(props: Partial<IStyleProps>): this {
    Object.entries(props).forEach(([propName, property]) =>
      this.properties.state[propName] = property
    )
    return this;
  }


  build() {
    const build: [string, (string | number)][] = [];

    Object.entries(this.computed).forEach(([propName, property]) => {
      if (!property) return;
      const name = decamelize(propName);

      build[name] = property;
      if (name.endsWith('-vertical')) {
        build[`${name}-top`] = property;
        build[`${name}-bottom`] = property;
      } else if (name.endsWith('-horizontal')) {
        build[`${name}-right`] = property;
        build[`${name}-left`] = property;
      }
    })

    return build;
  }

}