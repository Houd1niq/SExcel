import {defaultStyles} from "../../constants";
import {camelCaseToDash, toInlineStyles} from "../../core/utils";

const CODES = {
  A: 65, Z: 90,
};

export function createTable(rowsNum = 15, state) {
  // const colSizes = Object.entries(colState);
  // console.log(colSizes);
  const colsNum = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsNum)
    .fill("")
    .map((item, idx) => String.fromCharCode(CODES.A + idx))
    .map((item, i) => createColumn(item, i, state.colState[i]))
    .join("");
  rows.push(createRow(cols));

  for (let i = 0; i < rowsNum; i++) {
    rows.push(createRow(createCells(i, state), state.rowState[i], i + 1));
  }

  return rows.join("");
}

function createRow(content, size, num = "") {
  const resize = num !== "" ? `<div class="row-resize" data-resize="row"></div>` : "";
  const metaSize = size ? "style=\"height: " + size + "px\"" : "";
  return `
    <div class="row" ${metaSize} data-row="${num - 1}" data-type="resizeble">
      <div data-address-row="${num - 1}" class="row-info">
        ${num}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function createCells(rowNumber, state) {
  const colsNum = CODES.Z - CODES.A + 1;
  return new Array(colsNum)
    .fill("")
    .map((item, idx) => createCell(idx, rowNumber, state))
    .join("");
}

function createCell(idx, rowNumber, state) {
  const dataState = state.dataState;
  const size = state.colState[idx];
  const id = `${rowNumber}:${idx}`;
  // console.log(state.stylesState[id]);
  const metaSize = size ? "width: " + size + "px" : "";
  let styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
  return `
    <div data-col-idx="${idx}" style="${metaSize}; ${styles}" data-id="${id}" class="cell" contenteditable="true">
      ${dataState[id] || ""}
    </div>
  `;
}

function createColumn(content, idx, size) {
  const metaSize = size ? "style=\"width: " + size + "px\"" : "";
  return `
    <div class="column" data-col="${idx}" ${metaSize} data-type="resizeble">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}
