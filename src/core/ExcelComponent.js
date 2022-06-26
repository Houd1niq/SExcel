import {DOMListener} from "./DOMListener";

export class ExcelComponent extends DOMListener {
  // Возвращает шаблон элемента
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.store = options.store;
    this.subscriptions = options.subscriptions || [];
    this.prepare();
  }

  onStoreChanges() {
  }

  prepare() {
  }

  init() {
    this.initDomListeners();
  }

  $emit(event, ...args) {
    return this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  destroy() {
    this.unsubscribers.forEach((item) => item());
    this.removeDomListeners();
  }

  toHTML() {
    return ``;
  }
}
