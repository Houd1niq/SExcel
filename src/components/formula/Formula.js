import {ExcelComponent} from "../../core/ExcelComponent";
import {RegDict} from "./regDict";
import {formulaHandler} from "./formulaHandler";
import {ExcelStateComponent} from "../../core/ExcelStateComponent";

export class Formula extends ExcelStateComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      subscriptions: ["currentText"],
      ...options,
    });
    this.regDict = new RegDict();
    this.$formula = null;
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
  }

  onStoreChanges(changes) {
    this.$formula.text = changes.currentText;
  }

  prepare() {
  }

  onInput(e) {
    this.$emit("formula:input", e.target.textContent);
  }

  onKeydown(e) {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const result = this.regDict.testOnExpression(this.$formula.text);
      if (result) {
        const resultOfComputation = formulaHandler(result, this.$formula, this.$emit);
        this.$emit("formula:input", resultOfComputation);
      }
      this.$emit("formula:enterPress");
    }
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div class="formula-input" contenteditable spellcheck="false"></div>
    `;
  }
}
