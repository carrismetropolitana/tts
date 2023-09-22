const fs = require('fs');
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
  const trackerCsvUpdated = Papa.unparse(data, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`${settings.TRACKERS_DIRNAME}/tracker_${name}.csv`, trackerCsvUpdated);
};

const clean = (name) => {
  const trackerData = get(name);
  const allTrackerItemIds = trackerData.map((item) => String(item.id));
  const directoryContents = fs.readdirSync(`${settings.OUTPUTS_DIRNAME}/${name}/`, { withFileTypes: false });

  console.log('allTrackerItemIds', allTrackerItemIds);
  console.log('directoryContents', directoryContents);
  for (const existingFile of directoryContents) {
    console.log('existingFile.name', existingFile.name);
    if (allTrackerItemIds.includes(existingFile.name)) continue;
    fs.rmSync(`${settings.OUTPUTS_DIRNAME}/${name}/${existingFile.name}`, { recursive: true, force: true });
  }
};

module.exports = { get, set, clean };
