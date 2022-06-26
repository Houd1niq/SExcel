export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function getGroup($current, $target, $root) {
  let [rowEnd, colEnd] = $target.dataset.id.split(":").map((item) => Number(item));
  let [rowStart, colStart] = $current.dataset.id.split(":").map((item) => Number.parseInt(item));
  [rowStart, rowEnd] = [rowEnd, rowStart].sort((a, b) => a - b);
  [colStart, colEnd] = [colStart, colEnd].sort((a, b) => a - b);
  let cellsGroup = [];
  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = colStart; j <= colEnd; j++) {
      const $cell = $root.find(`[data-id="${i}:${j}"]`);
      cellsGroup.push($cell);
    }
  }
  return cellsGroup;
}
