const fs = require('fs');
const Papa = require('papaparse');
const makeTTS = require('./services/makeTTS');

/* CREATE TTS STOP NAME IN CSV */

(async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('* TTS TEXT');
  const start = new Date();
  console.log('* Run started on ' + start.toISOString());

  // Import stops.txt file
  console.log('* Reading stops.txt file from disk...');
  const allStopsTxt = fs.readFileSync('stops.txt', { encoding: 'utf8' });
  const allStopsPapa = Papa.parse(allStopsTxt, { header: true });
  const allStopsData = allStopsPapa.data;

  // Define variable to hold results
  const ttsSummary = [];

  // Log progress
  console.log('* Preparing ' + allStopsData.length + ' stops...');

  // Iterate on each stop
  for (const [index, stop] of allStopsData.entries()) {
    //
    process.stdout.clearLine();
    process.stdout.write(`* Processing stop ${stop.stop_id} (${index}/${allStopsData.length})`);
    process.stdout.cursorTo(0);

    // Assemble transfer modes
    let modes = (({ light_rail, subway, train, boat, bike_sharing, airport }) => ({ light_rail, subway, train, boat, bike_sharing, airport }))(stop);

    const ttsStopName = makeTTS(stop.stop_name, modes);

    ttsSummary.push({
      stop_id: stop.stop_id,
      stop_name: stop.stop_name,
      tts_stop_name: ttsStopName,
    });

    //
  }

  // Create the output directory if it does not exist
  const dirname = 'outputs';
  const filename = 'stops_tts_summary.txt';
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

  // Save the formatted data into a CSV file
  process.stdout.clearLine();
  console.log('* Saving result to CSV file...');
  const ttsSummaryCsv = Papa.unparse(ttsSummary, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`${dirname}/${filename}`, ttsSummaryCsv);

  //
  console.log('* Processed ' + ttsSummary.length + ' stops.');
  const syncDuration = new Date() - start;
  console.log('* Run took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
