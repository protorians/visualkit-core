export class ClientInterface {
  protected static _loaded: boolean = false;
  protected static _ready: boolean = false;

  static get ready(): boolean {
    return this._ready;
  }

  static get loaded(): boolean {
    return this._loaded;
  }

  static run() {
    if (!this._loaded) {
      window.addEventListener('DOMContentLoaded', () => this._ready = true)
      window.addEventListener('load', () => this._loaded = true)
    }
  }

}