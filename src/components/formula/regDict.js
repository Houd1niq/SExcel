export class RegDict {
  constructor() {
    this.dictionary = {
      sum: [/=сумм\((d+|\w\d+);\s?(\d+|\w\d+)\)/, /=(\d+|\w\d+)\s?\+\s?(\d+|\w\d+)/],
      sumDiapason: /=сумм\((d+|\w\d+):\s?(\d+|\w\d+)\)/,
      minus: [/=минус\((d+|\w\d+);\s?(\d+|\w\d+)\)/, /=(\d+|\w\d+)\s?-\s?(\d+|\w\d+)/],
      minimal: /=мин\((d+|\w\d+);\s?(\d+|\w\d+)\)/,
      minimalDiapason: /=мин\((d+|\w\d+):\s?(\d+|\w\d+)\)/,
    };
  }

  testOnExpression(value) {
    const regExps = Object.keys(this.dictionary);
    let result = null;
    let res = null;
    regExps.forEach((key) => {
      if (Array.isArray(this.dictionary[key])) {
        this.dictionary[key].forEach((item) => {
          if (value.match(item)) {
            res = value.match(item);
          }
        });
      } else {
        res = value.match(this.dictionary[key]);
      }
      if (res !== null) {
        result = {};
        result.value = res;
        result.key = key;
      }
    });
    console.log(result);
    return result;
  }
}
