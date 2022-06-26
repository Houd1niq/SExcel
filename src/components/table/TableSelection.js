import {$} from "../../core/dom";

export class TableSelection {
  constructor($root) {
    this.$root = $root;
    this.group = [];
    this.$current = null;
  }

  #selectAddressCells() {
    let [row, col] = this.$current.dataset.id.split(":");
    let addressRow = $(`[data-address-row="${row}"]`);
    addressRow.addClass("active_address_cell");
    let addressCol = $(`[data-col="${col}"]`);
    addressCol.addClass("active_address_cell");
  }

  #removeSelectionAddressCells() {
    let [row, col] = this.$current.dataset.id.split(":");
    let addressRow = $(`[data-address-row="${row}"]`);
    addressRow.removeClass("active_address_cell");
    let addressCol = $(`[data-col="${col}"]`);
    addressCol.removeClass("active_address_cell");
  }

  select($el) {
    if (this.$current) {
      this.#removeSelectionAddressCells();
    }
    this.removeSelect();
    this.group.push($el);
    this.$current = $el;
    $el.addClass("selected");
    $el.$el.focus();
    this.#selectAddressCells();
  }

  getGroupIds() {
    return this.group.map($cell => {
      return $cell.id();
    });
  }

  move(key) {
    if (key === "ArrowLeft") {
      let [row, col] = this.$current.dataset.id.split(":").map((item) => Number(item));
      if (col >= 1) {
        let $cell = this.$root.find(`[data-id="${row}:${col - 1}"]`);
        this.select($cell);
      }
    }
    if (key === "ArrowRight" || key === "Tab") {
      let [row, col] = this.$current.dataset.id.split(":").map((item) => Number(item));
      if (col < 25) {
        // DEBUG
        let $cell = this.$root.find(`[data-id="${row}:${col + 1}"]`);
        this.select($cell);
      }
    }
    if (key === "ArrowDown" || key === "Enter") {
      let [row, col] = this.$current.dataset.id.split(":").map((item) => Number(item));
      if (row < 29) {
        // DEBUG
        let $cell = this.$root.find(`[data-id="${row + 1}:${col}"]`);
        this.select($cell);
      }
    }
    if (key === "ArrowUp") {
      let [row, col] = this.$current.dataset.id.split(":").map((item) => Number(item));
      if (row > 0) {
        let $cell = this.$root.find(`[data-id="${row - 1}:${col}"]`);
        this.select($cell);
      }
    }
  }

  applyStyle(style) {
    this.group.forEach($cell => $cell.css(style));
  }

  removeSelect() {
    this.group.forEach(($item) => $item.removeClass("selected"));
    this.group = [];
  }

  selectGroup(group) {
    this.removeSelect();
    this.group = [];
    group.forEach(($item) => {
      $item.addClass("selected");
      this.group.push($item);
    });
  }
}
