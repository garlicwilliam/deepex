var xlsx = require('node-xlsx').default;
var fs = require('fs');
var path = require('path');

const parseLocalJson = lang => {
  const url = path.resolve(__dirname, `../src/locale/${lang}.ts`);
  const source = fs.readFileSync(url, 'utf8');
  return eval(`${source.replace('export default ', 'false? null: ')}`);
  // return JSON.parse(source.replace('export default ', ''));
};

const generateExcel = () => {
  const json = parseLocalJson('en');
  const ruJson = parseLocalJson('ru');
  const koJson = parseLocalJson('ko');
  const viJson = parseLocalJson('vi');
  const jaJson = parseLocalJson('ja');
  const separater = ' ';

  const data = [['KEY', '英文', separater, '俄文', separater, '韩文', separater, '越南', separater, '日文']];

  Object.keys(json).forEach(key => {
    data.push([
      key,
      json[key],
      separater,
      ruJson[key] || '',
      separater,
      koJson[key] || '',
      separater,
      viJson[key] || '',
      separater,
      jaJson[key] || '',
    ]);
  });

  var buffer = xlsx.build([{ name: '翻译内容', data: data }]); // Returns a buffer

  fs.writeFileSync(path.resolve(__dirname, 'shield-translation.xlsx'), buffer);
};

generateExcel();

module.exports = function parseExcel(path) {
  var sheets = xlsx.parse(fs.readFileSync(path));
  sheets.forEach(function (sheet) {
    var arrays = sheet.data;
    // remove columns
    var colums = arrays.splice(0, 1)[0];

    sheet.data = arrays.reduce(function (allUsers, user) {
      allUsers[user[0]] = user[1];
      return allUsers;
    }, {});

    return sheet;
  });
  return sheets;
};
