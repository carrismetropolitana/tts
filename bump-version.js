/* * */

const fs = require('fs');
const libPJson = require('./lib/package.json');
const daemonPJson = require('./daemon/package.json');

/* * */

const now = new Date();
const year = now.getFullYear();
const month = padNumber(now.getMonth() + 1);
const seconds = Number(parseInt(now.getTime()/1000))

const version = `${year}.${month}.${seconds}`;

libPJson.version = version;
daemonPJson.version = version;

fs.writeFileSync('./lib/package.json', JSON.stringify(libPJson, null, 4));
fs.writeFileSync('./daemon/package.json', JSON.stringify(daemonPJson, null, 4));

/* * */

function padNumber(number) {
  return number.toString().padStart(2, '0');
}
