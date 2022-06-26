export class Page {
  constructor(param) {
    this.param = param;

  }

  getRoot() {
    throw new Error("Need implementation");
  }

  afterRender() {

  }

  destroy() {
  }

}
