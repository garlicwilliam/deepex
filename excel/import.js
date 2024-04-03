var xlsx = require('node-xlsx').default;
var fs = require('fs');
var path = require('path');
const sequences = require('./constant');

const languages = ['en', 'th', 'ru'];

console.log('sequences', sequences);

const parseLocalJson = language => {
  const url = path.resolve(__dirname, `../src/locale/${language}.js`);
  if (!fs.existsSync(url)) {
    return {};
  }
  const source = fs.readFileSync(url, 'utf8');
  return eval(`${source.replace('export default ', 'false? null: ')}`);
  // return JSON.parse(source.replace('export default ', ''));
};


const current = (() => {
  return languages.reduce((all, language) => {
    all[language] = parseLocalJson(language);
    return all;
  }, {});
})();

const excelColumns = [['KEY'].concat(Object.values(sequences))];
console.log('excelColumns', excelColumns);
console.log('current', current);

function parseExcel(currentI18nDatas) {
  const excelFile = 'latest.xlsx';
  const url = path.resolve(__dirname, excelFile);
  var sheets = xlsx.parse(fs.readFileSync(url));
  const i18nSheet = sheets[0];

  var arrays = i18nSheet.data;
  // // remove columns
  var colums = arrays.splice(0, 1)[0];

  console.log('extract sheets', colums, arrays);

  return arrays.reduce(function (i18ns, row) {
    const key = row[0];
    languages.forEach((element, index) => {
      i18ns[element][key] = row[index + 1] || '';
    });
    return i18ns;
  }, currentI18nDatas);
}

const finalData = parseExcel(current);

const fKeys = Object.keys(finalData);

const sortedKeys = Object.keys(finalData['en']).sort((pre, next) => pre.toLowerCase() > next.toLowerCase() ? 1 : -1);

fKeys.forEach(lg => {
  const jsonData = finalData[lg];

  const sortttedData = sortedKeys.reduce((sortData, key) => {
    sortData[key] = jsonData[key];
    return sortData;
  }, {});

  fs.writeFileSync(path.resolve(__dirname, `../src/locale/${lg}.js`), `export default ${JSON.stringify(sortttedData)}`);
});

