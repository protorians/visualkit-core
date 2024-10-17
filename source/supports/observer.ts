import {Analyzer} from "./analyzer";

export class Observer {

  protected static _observer: MutationObserver | undefined = undefined;
  protected static analyzer: Analyzer | undefined = undefined;

  static kill() {
    if (this._observer) this._observer.disconnect();
    this.analyzer = new Analyzer();
    return this
  }

  static run() {
    this.kill()._observer = new MutationObserver(mutations => this.analyzer?.provides(mutations)?.parse())
    this._observer!.observe(document.body, {childList: true, subtree: true, attributes: true})
    this.analyzer!.parse()
    return this;
  }

}