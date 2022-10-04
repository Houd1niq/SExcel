export default function formulaHelperTemplate(regDict) {
  const data = [];
  const regObjsArray = Object.values(regDict.dictionary);
  let items = "";
  regObjsArray.forEach((item) => {
    data.push({ value: item.value, hint: item.hint });
  });

  data.forEach((item) => {
    items += `
    <li class="formula-helper__item">
      <p class="formula-helper__value">${item.value}</p>
      <span class="formula-helper__hint">${item.hint}</span>
    </li>`;
  });

  return `<ul class="formula-helper">
    ${items}
  </ul>`;
}
