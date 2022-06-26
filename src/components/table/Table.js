import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {tableResHandler} from "./table.resizer";
import {getGroup, shouldResize} from "./table.helperFunction";
import {TableSelection} from "./TableSelection";
import {$} from "../../core/dom";
import * as actions from "../../store/actions";
import {RegDict} from "../formula/regDict";
import {formulaHandler} from "../formula/formulaHandler";
import {defaultStyles} from "../../constants";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
    this.regDict = new RegDict();
  }

  prepare() {
    this.selection = new TableSelection(this.$root);
    this.$on("formula:input", (data) => {
      this.selection.$current.text = data;
      this.changeTextInStore(data);
    });
    this.$on("formula:enterPress", () => {
      this.selection.select(this.selection.$current);
    });
  }

  init() {
    super.init();
    const $cell = this.$root.find("[data-id=\"0:0\"]");
    this.selection.select($cell);
    this.$emit("table:selection", $cell);
    this.changeTextInStore($cell.text);
    this.parseStylesOfCell();
    this.$on("toolbar:applyStyle", (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(actions.applyStyle({
        ids: this.selection.getGroupIds(),
        value: style,
      }));
    });
  }

  toHTML() {
    return createTable(30, this.store.getState());
  }

  changeTextInStore(text) {
    this.$dispatch(
      actions.changeText({
        value: String(text),
        id: this.selection.$current.id(),
      }),
    );
  }

  onInput(e) {
    if (e.target.hasAttribute("data-id")) {
      this.changeTextInStore($(e.target).text);
    }
  }

  async resize(e) {
    try {
      const data = await tableResHandler(this.$root, e);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn("ERROR", e.message);
    }
  }

  parseStylesOfCell() {
    const styles = this.selection.$current.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  onMousedown(e) {
    // Resize
    if (shouldResize(e)) {
      this.resize(e);
    }


    // Selection
    if (e.target.dataset.id) {
      const $target = $(e.target);
      this.$emit("table:selection", $target);

      if (e.shiftKey) {
        const $current = this.selection.$current;
        const cellsGroup = getGroup($current, $target, this.$root);
        this.selection.selectGroup(cellsGroup);
      } else {
        this.selection.select($target);
        this.parseStylesOfCell();
        this.changeTextInStore($target.text);
      }
    }
  }

  onKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const res = this.regDict.testOnExpression(this.selection.$current.text);
      if (res) {
        console.log(res);
        const resultOfComputation = formulaHandler(res, $(".formula-input"));
        this.$emit("formula:input", resultOfComputation);
      }
    }
    if (
      (e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "Enter" ||
        e.key === "Tab") &&
      !e.shiftKey &&
      !e.ctrlKey
    ) {
      e.preventDefault();
      this.selection.move(e.key);
      this.parseStylesOfCell();
      this.$emit("table:move", this.selection.$current);
    } else if (e.ctrlKey) {
    }
  }
}
