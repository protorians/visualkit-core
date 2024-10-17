import type {
  IStyleAsset,
  IAssets,
  IScriptAsset,
  IAssetSorts,
  IAssetKit,
  IAssetEventsMap,
  IAssetTypes,
  IAssetEntries,
  IStyleAssetResponse,
  IScriptAssetResponse,
  IServiceAssetResponse,
  IAssetEntry,
  IAssetResponses,
  IServiceAsset
} from "../types";
import {Signalables} from "@protorians/signalable";
import {Climbing, IClimbing, unCamelCase} from "@protorians/core";
import {VisualKitException} from "./exception";
import {IParameters} from "@protorians/widgets";

export class AssetsKit<P extends IParameters> implements IAssetKit<P> {

  protected static _scriptsLoaded: IScriptAsset[] = [];
  protected static _linkLoaded: IStyleAsset[] = [];

  static get scripts() {
    return this._scriptsLoaded
  }

  static get links() {
    return this._linkLoaded
  }

  static mergeAttributes<T extends (HTMLScriptElement | HTMLLinkElement)>(
    element: T,
    payload: IStyleAsset | IScriptAsset
  ) {
    Object.entries(payload).forEach(([key, value]) =>
      (key !== 'src' && key !== 'href' && value)
        ? element.setAttribute(unCamelCase(key), `${value}`)
        : void (0)
    )
    return element;
  }

  static checking<T extends (HTMLScriptElement | HTMLLinkElement)>(selector: string) {
    return (document.querySelector(selector) || undefined) as T | undefined;
  }

  static script(entry: IScriptAsset,): Promise<IScriptAssetResponse> {

    return new Promise<IScriptAssetResponse>((done, fail) => {
      const check = this.checking<HTMLScriptElement>(`script[src="${entry.src}"]`)
      if (check) return done({target: check, entry, payload: new Event('load')});
      const target = document.createElement('script');

      target.addEventListener('load', payload => {
        this._scriptsLoaded.push(entry);
        done({target, entry, payload});
      })
      target.addEventListener('error', (ev) => fail(ev))

      document.head.append(this.mergeAttributes(target, entry))
      target.src = entry.src;

    })

  }

  static link(entry: IStyleAsset,): Promise<IStyleAssetResponse> {

    return new Promise<IStyleAssetResponse>((done, fail) => {
      const check = this.checking<HTMLLinkElement>(`link[href="${entry.href}"]`)
      if (check) return done({target: check, entry, payload: new Event('load')});
      const target = document.createElement('link');

      target.addEventListener('load', payload => {
        this._linkLoaded.push(entry);
        done({target, entry, payload});
      })
      target.addEventListener('error', (ev) => fail(ev))

      document.head.append(this.mergeAttributes(target, entry))
      target.href = entry.href;
    })

  }


  climbing: IClimbing<IAssetEntry>;
  signals: Signalables<IAssets, IAssetEventsMap>;
  responses: IAssetResponses = [];
  props: P = {} as P

  constructor(
    public readonly assets: IAssets,
  ) {
    this.signals = new Signalables<IAssets, IAssetEventsMap>(this.assets);
    this.climbing = new Climbing(
      this.entries || [],
      (index) => {
        return new Promise((resolve, reject) => {
          const entry = this.entries[index];

          if (entry.assetFamily == 'styles') {
            AssetsKit.link({...entry} as IStyleAsset)
              .then((response) => resolve(this.loadDispatches('style', response, entry)))
              .catch(err => reject(this.errorDispatches('style', err)))
          } else if (entry.assetFamily == 'scripts') {
            AssetsKit.script({...entry} as IScriptAsset)
              .then((response) => resolve(this.loadDispatches('script', response, entry)))
              .catch(err => reject(this.errorDispatches('script', err)))
          } else if (entry.assetFamily == 'services') {
            const service = {...entry} as IServiceAsset

            fetch(service.endpoint, service.request || undefined)
              .then(async result => {
                const response = {
                  response: result,
                  entry: service,
                }

                if (await service.validator(response)) {
                  const params = await result.json();
                  this.props = {...this.props, ...(params || {})};
                  resolve(this.loadDispatches('service', response, entry))
                } else
                  reject(this.errorDispatches('service', new Error(`The validator rejected the service`)))

              })
              .catch(err => reject(this.errorDispatches('service', err)))

            // AssetsKit.script({...entry} as IScriptAsset)
            //   .then((response) => resolve(this.loadDispatches('script', response, entry)))
            //   .catch(err => reject(this.errorDispatches('script', err)))
          }

        })
      },
      !!this.assets.strict
    );

  }

  get sort(): IAssetSorts {
    if (!this.assets.sort) {
      const sorting: IAssetSorts = []
      const assets = Object.entries(this.assets)

      for (let index = 0; index < assets.length; index++) {
        if (assets[index][0] == 'scripts' || assets[index][0] == 'styles' || assets[index][0] == 'services')
          sorting[sorting.length] = assets[index][0] as keyof IAssetTypes;
      }
      return sorting;
    }

    return this.assets.sort;
  }

  get entries(): IAssetEntries {
    const entries: IAssetEntries = [];

    this.sort.forEach((key) => {
      const asset = this.assets[key]
      if (typeof asset !== 'undefined') {
        asset.forEach(item => {
          item.assetFamily = key;
          entries[entries.length] = item
        })
      }
    })

    return entries;
  }

  errorDispatches(
    index: string,
    err: VisualKitException | ErrorEvent,
  ): VisualKitException | ErrorEvent {
    this.signals.dispatch(`error:${index}` as keyof IAssetEventsMap, err)
    this.signals.dispatch('error', err)
    return err;
  }

  loadDispatches(
    index: string,
    response: IStyleAssetResponse | IScriptAssetResponse | IServiceAssetResponse,
    entry: IAssetEntry,
  ): IAssetEntry {
    this.responses.push(response)
    this.signals.dispatch(`load:${index}` as keyof IAssetEventsMap, response)
    this.signals.dispatch('load', entry)
    return entry
  }

  run() {
    this.climbing.trigger(() => this.signals.dispatch('complete', this.responses), 0)
    return this;
  }


}
