const fs = require('fs');
const Papa = require('papaparse');

const OUTPUTS_DIRNAME = 'outputs';
const TRACKERS_DIRNAME = 'trackers';

const init = (name) => {
  if (!fs.existsSync(TRACKERS_DIRNAME)) fs.mkdirSync(TRACKERS_DIRNAME, { recursive: true });
  if (!fs.existsSync(`${TRACKERS_DIRNAME}/tracker_${name}.csv`)) fs.writeFileSync(`${TRACKERS_DIRNAME}/tracker_${name}.csv`, '');
};

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

const clean = ({ name }) => {
  const trackerData = get({ name: name });
  const allTrackerItemIds = trackerData.map((item) => String(item.id));
  const directoryContents = fs.readdirSync(`${OUTPUTS_DIRNAME}/${name}`, { withFileTypes: true });
  for (const existingFile of directoryContents) {
    console.log('existingFile.name', existingFile.name);
    if (allTrackerItemIds.includes(existingFile.name)) continue;
    fs.rmSync(`${OUTPUTS_DIRNAME}/${name}/${existingFile.name}`, { recursive: true, force: true });
  }
};

module.exports = { get, set, clean };
