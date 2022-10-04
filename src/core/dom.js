class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML;
    }
  }

  get text() {
    return this.$el.textContent.trim();
  }

  set text(value) {
    return (this.$el.textContent = value);
  }

  get dataset() {
    return this.$el.dataset;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }

  getAll(selector) {
    let items = this.$el.querySelectorAll(selector);
    const $items = [];
    items.forEach((item) => {
      $items.push($(item));
    });
    items = null;
    return $items;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  getStyles(s) {
    return s.reduce((acc, item) => {
      acc[item] = this.$el.style[item];
      return acc;
    }, {});
  }

  get nodeName() {
    return this.$el.nodeName;
  }

  get parent() {
    return $(this.$el.parentElement);
  }

  toggleClass(className) {
    this.$el.classList.toggle(className);
  }

  id() {
    return this.$el.dataset.id;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  clear() {
    this.$el.innerHTML = "";
    return this;
  }

  append(node) {
    this.$el.append(node.$el);
  }

  on(eventType, fn) {
    this.$el.addEventListener(eventType, fn);
  }

  remove() {
    this.$el.remove();
  }

  get value() {
    return this.$el.value;
  }

  off(eventType, fn) {
    this.$el.removeEventListener(eventType, fn);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCords() {
    return this.$el.getBoundingClientRect();
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
