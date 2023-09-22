const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const settings = require('../config/settings');

const init = (name) => {
  if (!fs.existsSync(settings.TRACKERS_DIRNAME)) fs.mkdirSync(settings.TRACKERS_DIRNAME, { recursive: true });
  if (!fs.existsSync(`${settings.TRACKERS_DIRNAME}/tracker_${name}.csv`)) fs.writeFileSync(`${settings.TRACKERS_DIRNAME}/tracker_${name}.csv`, '');
};

const get = (name) => {
  init(name);
  console.log(`* Reading tracker_${name}.csv file from disk...`);
  const trackerCsv = fs.readFileSync(`${settings.TRACKERS_DIRNAME}/tracker_${name}.csv`, { encoding: 'utf8' });
  const trackerPapa = Papa.parse(trackerCsv, { header: true });
  return trackerPapa.data;
};

const set = (name, data) => {
  init(name);
  console.log(`* Saving tracker_${name}.csv file to disk...`);
  const trackerCsvUpdated = Papa.unparse(data, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`${settings.TRACKERS_DIRNAME}/tracker_${name}.csv`, trackerCsvUpdated);
};

const clean = (name) => {
  console.log(`* Cleaning ${name}...`);
  const trackerData = get(name);
  const allTrackerItemIds = trackerData.map((item) => String(item.id));
  const directoryContents = fs.readdirSync(`${settings.OUTPUTS_DIRNAME}/${name}/`, { withFileTypes: true });
  for (const existingFile of directoryContents) {
    const filenameWithoutExtension = path.parse(existingFile.name).name;
    if (allTrackerItemIds.includes(filenameWithoutExtension)) continue;
    fs.rmSync(`${settings.OUTPUTS_DIRNAME}/${name}/${existingFile.name}`, { recursive: true, force: true });
  }
};

module.exports = { get, set, clean };
