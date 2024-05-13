/* * */

const fs = require('fs');
const libPJson = require('./package.json');
const daemonPJson = require('../daemon/package.json');

/* * */

const now = new Date();
const year = now.getFullYear();
const month = padNumber(now.getMonth() + 1);
const day = padNumber(now.getDate());
const hours = padNumber(now.getHours());
const minutes = padNumber(now.getMinutes());

const version = `${year}.${month}.${day}${hours}${minutes}`;

libPJson.version = version;
daemonPJson.version = version;

fs.writeFileSync('./package.json', JSON.stringify(libPJson, null, 4));
fs.writeFileSync('../daemon/package.json', JSON.stringify(daemonPJson, null, 4));

/* * */

function padNumber(number) {
  return number.toString().padStart(2, '0');
}
