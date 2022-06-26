import { getDateOfOpen, storage } from "../core/utils";
import { defaultStyles } from "../constants";

export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  tableName: "Новая Таблица",
  currentText: "",
  dateOfOpen: getDateOfOpen(),
  currentStyles: defaultStyles,
};

export const initialState = storage("excelState");
