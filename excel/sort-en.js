
var fs = require('fs');
var path = require('path');

const parseLocalJson = language => {
    const url = path.resolve(__dirname, `../src/locale/${language}.js`);
    if (!fs.existsSync(url)) {
      return {};
    }
    const source = fs.readFileSync(url, 'utf8');
    return eval(`${source.replace('export default ', 'false? null: ')}`);
    // return JSON.parse(source.replace('export default ', ''));
  };

const enData = parseLocalJson('en');
const sortEnKeys = Object.keys(enData).sort((pre, next) => pre.toLowerCase() > next.toLowerCase() ? 1 : -1);

// console.log(sortEnKeys);
const sortEnData = sortEnKeys.reduce((val, key) => {
    console.log(enData[key]);
    val[key] = enData[key];
    return val;
}, {});

fs.writeFileSync(path.resolve(__dirname, '../src/locale/en.js'), JSON.stringify(sortEnData, null, 2));