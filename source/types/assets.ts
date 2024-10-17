import type {ICrossOrigin, ILinkRel, IParameters, IReferrerPolicy} from "@protorians/widgets";
import {VisualKitException} from "../supports";
import {ISignalables} from "@protorians/signalable";
import {IClimbing} from "@protorians/core";

export type IScriptAsset = {
  src: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
  crossOrigin?: ICrossOrigin;
  integrity?: string;
  noModule?: boolean;
  referrerPolicy?: IReferrerPolicy;
}

export type IStyleAsset = {
  href: string;
  crossOrigin?: ICrossOrigin;
  referrerPolicy?: IReferrerPolicy;
  hreflang?: string;
  media?: string;
  rel?: ILinkRel;
  sizes?: string;
  title?: string;
  type?: string;
}

export type IServiceAsset = {
  endpoint: string;
  request?:  RequestInit;
  validator: (data: IServiceAssetResponse) => boolean | Promise<boolean>;
}

export type IStyleAssetResponse = {
  target: HTMLLinkElement;
  entry: IAssetEntrySlot<IStyleAsset> | IStyleAsset;
  payload: Event;
}

export type IScriptAssetResponse = {
  target: HTMLScriptElement;
  entry: IAssetEntrySlot<IScriptAsset> | IScriptAsset;
  payload: Event;
}

export type IServiceAssetResponse = {
  response: Response;
  entry: IAssetEntrySlot<IServiceAsset> | IServiceAsset;
}

export type IAssetResponse = IStyleAssetResponse | IScriptAssetResponse | IServiceAssetResponse

export type IAssetResponses = IAssetResponse[]

// export type IAssetScriptComplete = (element: HTMLScriptElement, event: Event) => void;
// export type IAssetScriptFail = (element: HTMLScriptElement, event: ErrorEvent) => void;
//
// export type IAssetStyleComplete = (element: HTMLLinkElement, event: Event) => void;
// export type IAssetStyleFail = (element: HTMLLinkElement, event: ErrorEvent) => void;
//
// export type IAssetServiceComplete = (service: IServiceAsset, event: Response) => void;
// export type IAssetServiceFail = (service: IServiceAsset, event: Response) => void;


export type IAssetSorts = (keyof Partial<IAssetTypes>)[];

export type IAssetTypes = {
  styles: IStyleAsset,
  scripts: IScriptAsset,
  services: IServiceAsset,
};

export type IAssetEntrySlot<T> = T & {
  assetFamily: keyof IAssetTypes;
}

export type IAssetEntry = IAssetEntrySlot<IAssetTypes[keyof IAssetTypes]>

export type IAssetEntries = IAssetEntry[];

export type IAssetEventsMap = {
  complete: IAssetResponses;
  load: IAssetEntry;
  'load:style': IStyleAssetResponse;
  'load:script': IScriptAssetResponse;
  'load:service': IServiceAssetResponse;
  'error': VisualKitException | ErrorEvent;
  'error:style': VisualKitException | ErrorEvent;
  'error:script': VisualKitException | ErrorEvent;
  'error:service': VisualKitException | ErrorEvent;
}

export type IAssets = {
  scripts?: IScriptAsset[];
  styles?: IStyleAsset[];
  services?: IServiceAsset[];
  sort?: IAssetSorts;
  strict?: boolean;
}


export interface IAssetKit<P extends IParameters> {
  readonly assets: IAssets;

  props: P

  get sort(): IAssetSorts;

  get entries(): IAssetEntries;

  climbing: IClimbing<IAssetEntry>;

  signals: ISignalables<IAssets, IAssetEventsMap>;

  responses: IAssetResponses;
}