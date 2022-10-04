export class RegDict {
  constructor() {
    this.dictionary = {
      sum: {
        regExp: [
          /=сумм\((\d+|\w\d+);\s?(\d+|\w\d+)\)/,
          /=(\d+|\w\d+)\s?\+\s?(\d+|\w\d+)/,
        ],
        value: "=сумм(;)",
        hint: "Сумма двух чисел или ячеек",
      },
      sumDiapason: {
        regExp: [/=сумм\((d+|\w\d+):\s?(d+|\w\d+)\)/],
        value: '"=сумм(:)"',
        hint: "Сумма диапазона двух ячеек",
      },
      minus: {
        regExp: [
          /=минус\((\d+|\w\d+);\s?(\d+|\w\d+)\)/,
          /=(\d+|\w\d+)\s?-\s?(\d+|\w\d+)/,
        ],
        value: "=минус(;)",
        hint: "Разность двух чисел или ячеек",
      },
      minimal: {
        regExp: [/=мин\((\d+|\w\d+);\s?(\d+|\w\d+)\)/],
        value: "=мин(;)",
        hint: "Минимальное из двух чисел или ячеек",
      },
      minimalDiapason: {
        regExp: [/=мин\((d+|\w\d+):\s?(d+|\w\d+)\)/],
        value: "=мин(:)",
        hint: "Минимальное из диапазона ячеек",
      },
    };
  }

  testOnExpression(value) {
    const regExps = Object.keys(this.dictionary);
    let result = null;
    regExps.forEach((key) => {
      let res = null;
      if (Array.isArray(this.dictionary[key].regExp)) {
        this.dictionary[key].regExp.forEach((item) => {
          if (value.match(item)) {
            res = value.match(item);
          }
        });
      } else {
        res = value.match(this.dictionary.regExp[key]);
      }
      if (res !== null) {
        result = {};
        result.value = res;
        result.key = key;
      }
    });
    return result;
  }
}
