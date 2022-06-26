import {ExcelComponent} from "../../core/ExcelComponent";
import * as actions from "../../store/actions";
import {$} from "../../core/dom";
import {headerTemplate} from "./header.template";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      ...options,
    });
    this.$headerInput = null;
  }

  onInput(e) {
    const tableName = this.$headerInput.value;
    this.$dispatch(actions.changeTableName(tableName));
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.dataset.type === "btn-delete") {
      const param = window.location.hash.split("/")[1];
      localStorage.removeItem(`excel:${param}`);
      document.location.hash = "#";
    }
    if ($target.dataset.type === "btn-сlose") {
      document.location.hash = "#";
    }
  }


  init() {
    super.init();
    this.$headerInput = this.$root.find(".input");
  }

  toHTML() {
    return headerTemplate(this.store.getState());
  }
}
