const fs = require('fs');
const Papa = require('papaparse');

const TRACKERS_DIRNAME = 'trackers';

const get = ({ name }) => {
  init(name);
  console.log(`* Reading tracker_${name}.csv file from disk...`);
  const trackerCsv = fs.readFileSync(`${TRACKERS_DIRNAME}/tracker_${name}.csv`, { encoding: 'utf8' });
  const trackerPapa = Papa.parse(trackerCsv, { header: true });
  return trackerPapa.data;
};

const set = ({ name, data }) => {
  init(name);
  const trackerCsvUpdated = Papa.unparse(data, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`${TRACKERS_DIRNAME}/tracker_${name}.csv`, trackerCsvUpdated);
};

const init = (name) => {
  if (!fs.existsSync(TRACKERS_DIRNAME)) fs.mkdirSync(TRACKERS_DIRNAME, { recursive: true });
  if (!fs.existsSync(`${TRACKERS_DIRNAME}/tracker_${name}.csv`)) fs.writeFileSync(`${TRACKERS_DIRNAME}/tracker_${name}.csv`, '');
};

module.exports = { get, set };
