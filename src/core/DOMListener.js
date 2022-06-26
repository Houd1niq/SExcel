import {capitalize} from "./utils";

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("There is no $root");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`No method "${method}" in ${this.name}`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      let method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(listener) {
  return "on" + capitalize(listener);
}
