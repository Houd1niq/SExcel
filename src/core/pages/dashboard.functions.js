function toHTML(param, name, dateOfOpen) {
  return `
    <li class="db__record">
      <a class="db__link" href="#excel/${param}">${name}</a>
      <strong>${dateOfOpen}</strong>
    </li>
  `;
}

function getAllRecords() {
  const records = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes("excel")) {
      const key = localStorage.key(i);
      records.push({ [key]: JSON.parse(localStorage.getItem(key)) });
    }
  }
  return records;
}

function getTemplate(records) {
  return records.map((item) => {
    const key = Object.keys(item)[0];
    const name = item[key].tableName;
    const dateOfOpen = item[key].dateOfOpen;
    const param = key.split(":")[1];
    return toHTML(param, name, dateOfOpen);
  });
}

export function insertAllRecords() {
  const records = getAllRecords();
  if (!records.length) {
    return `<p>Пока не создано ни одной таблицы</p>`;
  }

  return `
    <ul class="db__list">
      ${getTemplate(records).join("")}
    </ul>
  `;
}
