import { getDateOfOpen, storage } from "../core/utils";
import { defaultStyles } from "../constants";

export class DefaultState {
  constructor() {
    this.rowState = {};
    this.colState = {};
    this.dataState = {};
    this.stylesState = {};
    this.tableName = "Новая Таблица";
    this.currentText = "";
    this.dateOfOpen = getDateOfOpen();
    this.currentStyles = defaultStyles;
  }
}

export const initialState = storage("excelState");
