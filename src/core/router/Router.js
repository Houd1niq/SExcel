import {$} from "../dom";
import {ActiveRoute} from "./ActiveRoute";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("Selector is required in Router");
    }
    this.$selector = $(selector);
    this.routes = routes;
    this.page = null;
    this.changePageHolder = this.changePageHolder.bind(this);
    this.init();
    this.changePageHolder();
  }

  init() {
    window.addEventListener("hashchange", this.changePageHolder);
  }

  changePageHolder(event) {
    let param = ActiveRoute.param[1];
    if (!param) {
      param = Date.now();
    }
    if (this.page) {
      this.page.destroy();
      this.$selector.clear();
    }
    const Page = ActiveRoute.param.includes("excel") ? this.routes.excel : this.routes.dashboard;
    this.page = new Page(param);
    this.$selector.append(this.page.getRoot());
    this.page.afterRender();


  }
}
