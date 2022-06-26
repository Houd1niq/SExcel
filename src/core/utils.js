import { defaultStyles } from "../constants";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDateOfOpen() {
  const date = new Date();
  return `${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}.${
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }.${date.getFullYear()}`;
}

export function isEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function ifBothIsNumber(result) {
  return (
    !isNaN(Number(result.value[1].slice(0, 1))) &&
    !isNaN(Number(result.value[2].slice(0, 1)))
  );
}

export function ifFirstIsCell(result) {
  return (
    isNaN(Number(result.value[1].slice(0, 1))) &&
    !isNaN(Number(result.value[2].slice(0, 1)))
  );
}

export function ifSecondIsCell(result) {
  return (
    !isNaN(Number(result.value[1].slice(0, 1))) &&
    isNaN(Number(result.value[2].slice(0, 1)))
  );
}

export function ifBothIsCell(result) {
  return (
    isNaN(Number(result.value[1].slice(0, 1))) &&
    isNaN(Number(result.value[2].slice(0, 1)))
  );
}

export function camelCaseToDash(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function toInlineStyles(stylesObject) {
  return Object.keys(stylesObject).reduce((acc, key) => {
    acc += `${camelCaseToDash(key)}: ${stylesObject[key]}; `;
    return acc;
  }, "");
}
