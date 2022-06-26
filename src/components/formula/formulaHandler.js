import { ifBothIsCell, ifBothIsNumber, ifFirstIsCell, ifSecondIsCell } from "../../core/utils";
import { $ } from "../../core/dom";

export function formulaHandler(result, $formula) {
  let value = 0;
  let [firstCellCol, firstCellRow, secondCellCol, secondCellRow] = getCellsIdForDiapason(result);

  switch (result.key) {
    case "sum":
      if (ifBothIsNumber(result)) {
        value = Number(result.value[1]) + Number(result.value[2]);
      }
      if (ifFirstIsCell(result)) {
        const $cell = getCell(result.value[1]);
        value = Number($cell.text) + Number(result.value[2]);
      }
      if (ifSecondIsCell(result)) {
        const $cell = getCell(result.value[2]);
        value = Number($cell.text) + Number(result.value[1]);
      }
      if (ifBothIsCell(result)) {
        const $cell1 = getCell(result.value[1]);
        const $cell2 = getCell(result.value[2]);
        value = Number($cell1.text) + Number($cell2.text);
      }
      $formula.text = value;
      return value;
    case "sumDiapason":
      for (let i = firstCellRow; i <= secondCellRow; i++) {
        for (let j = firstCellCol; j <= secondCellCol; j++) {
          const cellValue = Number($(`[data-id="${i}:${j}"]`).text);
          value += cellValue;
        }
      }
      return value;
    case "minus":
      if (ifBothIsNumber(result)) {
        value = Number(result.value[1]) - Number(result.value[2]);
      }
      if (ifFirstIsCell(result)) {
        const $cell = getCell(result.value[1]);
        value = Number($cell.text) - Number(result.value[2]);
      }
      if (ifSecondIsCell(result)) {
        const $cell = getCell(result.value[2]);
        value = Number($cell.text) - Number(result.value[1]);
      }
      if (ifBothIsCell(result)) {
        const $cell1 = getCell(result.value[1]);
        const $cell2 = getCell(result.value[2]);
        value = Number($cell1.text) - Number($cell2.text);
      }
      $formula.text = value;
      return value;
    case "minimal":
      if (ifBothIsNumber(result)) {
        value = Math.min(Number(result.value[1]), Number(result.value[2]));
      }
      if (ifFirstIsCell(result)) {
        const $cell = getCell(result.value[1]);
        value = Math.min(Number($cell.text), Number(result.value[2]));
      }
      if (ifSecondIsCell(result)) {
        const $cell = getCell(result.value[2]);
        value = Math.min(Number($cell.text), Number(result.value[1]));
      }
      if (ifBothIsCell(result)) {
        const $cell1 = getCell(result.value[1]);
        const $cell2 = getCell(result.value[2]);
        value = Math.min(Number($cell1.text), Number($cell2.text));
      }
      $formula.text = value;
      return value;
    case "minimalDiapason":
      const arrOfValues = [];
      for (let i = firstCellRow; i <= secondCellRow; i++) {
        for (let j = firstCellCol; j <= secondCellCol; j++) {
          const cellValue = Number($(`[data-id="${i}:${j}"]`).text);
          arrOfValues.push(cellValue);
        }
      }
      arrOfValues.sort((a, b) => a - b);
      value = arrOfValues[0];
      return value;
  }
}

function getCell(cellName) {
  const cellId = `${Number(cellName.slice(1, 2)) - 1}:${cellName.toUpperCase().charCodeAt(0) - 65}`;
  return $(`[data-id="${cellId}"]`);
}

function getCellsIdForDiapason(result) {
  let firstCellCol = result.value[1].slice(0, 1).toUpperCase().charCodeAt(0) - 65;
  let firstCellRow = Number(result.value[1].slice(1, 2)) - 1;
  let secondCellCol = result.value[2].slice(0, 1).toUpperCase().charCodeAt(0) - 65;
  let secondCellRow = Number(result.value[2].slice(1, 2)) - 1;
  return [firstCellCol, firstCellRow, secondCellCol, secondCellRow];
}
