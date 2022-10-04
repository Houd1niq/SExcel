import { RegDict } from "./regDict";
import { formulaHandler } from "./formulaHandler";
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { $ } from "../../core/dom";
import formulaHelperTemplate from "./formulaHelper.template";

export class Formula extends ExcelStateComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown", "click"],
      subscriptions: ["currentText"],
      ...options,
    });
    this.regDict = new RegDict();
    this.$formula = null;
    this.anyClickCloseHandler = this.anyClickCloseHandler.bind(this);
  }

  init() {
    super.init();
    this.$formula = this.$root.find(".formula-input");
    this.$on("table:selection", ($el) => {
      this.$formula.text = $el.text;
    });

    this.$on("table:move", ($el) => {
      this.$formula.text = $el.text;
    });
    document.body.addEventListener("click", this.anyClickCloseHandler);
  }

  destroy() {
    super.destroy();
    document.body.removeEventListener("click", this.anyClickCloseHandler);
  }

  anyClickCloseHandler(e) {
    if (!e.path.includes(this.$root.$el)) {
      this.closeHelper();
    }
  }

  onStoreChanges(changes) {
    this.$formula.text = changes.currentText;
  }

  closeHelper() {
    const $helper = $(".formula-helper");
    $helper.css({ display: "none" });
  }

  prepare() {}

  onInput(e) {
    this.$emit("formula:input", e.target.textContent);
    const $helper = $(".formula-helper");
    $helper.css({ display: "block" });
  }

  onClick(e) {
    const $helperItems = this.$root.getAll(".formula-helper__item");
    $helperItems.forEach(($item) => {
      if (e.path.includes($item.$el)) {
        const valueOfItem = $item.find(".formula-helper__value").text;
        this.$formula.text = valueOfItem;
        this.$emit("formula:input", valueOfItem);
        this.$formula.$el.focus();
        this.closeHelper();
      }
    });
  }

  onKeydown(e) {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      this.closeHelper();
      const result = this.regDict.testOnExpression(this.$formula.text);
      if (result) {
        const resultOfComputation = formulaHandler(
          result,
          this.$formula,
          this.$emit
        );
        this.$emit("formula:input", resultOfComputation);
      }
      this.$emit("formula:enterPress");
    }
    if (e.key === "Escape") this.closeHelper();
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div class="formula-input" contenteditable spellcheck="false"></div>
      ${formulaHelperTemplate(this.regDict)}
      
    `;
  }
}
