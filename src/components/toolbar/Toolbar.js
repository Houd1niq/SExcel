import {toolbarTemplate} from "./toolbar.template";
import {$} from "../../core/dom";
import {ExcelStateComponent} from "../../core/ExcelStateComponent";
import {defaultStyles} from "../../constants";

export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";

  constructor($root, options) {
    super($root, {
      name: "toolbar",
      listeners: ["click"],
      subscriptions: ["currentStyles"],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.dataset.type === "button") {
      const value = JSON.parse($target.dataset.value);
      this.$emit("toolbar:applyStyle", value);
      this.setState(value);
    }
    if ($target.dataset.type === "dropdown") {
      let $menu;
      if ($target.nodeName === "SPAN") {
        $menu = $target.parent.find(`[data-type="dropdown-menu"]`);
        $menu.toggleClass("visible");
      }
      if ($target.nodeName === "DIV") {
        $menu = $target.find(`[data-type="dropdown-menu"]`);
        $menu.toggleClass("visible");
      }
    }

  }

  onStoreChanges(changes) {
    this.setState(changes.currentStyles);
  }

  get template() {
    return toolbarTemplate(this.state);
  }

  toHTML() {
    return this.template;
  }
}
