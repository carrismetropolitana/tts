/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const Papa = require('papaparse');
const makeTTS = require('./services/makeTTS');

/* * *
 * ONE TIME EXECUTION
 */
(async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('* TTS TEXT');
  const start = new Date();
  console.log('* Run started on ' + start.toISOString());

  // Import stops.txt file
  console.log('* Reading stops.txt file from disk...');
  const txtData = fs.readFileSync('stops.txt', { encoding: 'utf8' });

  // Parse csv file
  console.log('* Parsing stops.txt file using Papaparse...');
  const originalStops = Papa.parse(txtData, { header: true });

  // Log progress
  console.log('* Preparing ' + originalStops.data.length + ' stops...');

  // Define variable to hold results
  const updatedStops = [];
  const modifiedOriginalStops = [];

  // Iterate on each stop
  for (const [index, stop] of originalStops.data.entries()) {
    //
    process.stdout.clearLine();
    process.stdout.write(`* Processing stop ${stop.stop_id} (${index}/${originalStops.data.length})`);
    process.stdout.cursorTo(0);

    // Assemble transfer modes
    let modes = (({ light_rail, subway, train, boat, bike_sharing, airport }) => ({ light_rail, subway, train, boat, bike_sharing, airport }))(stop);
    //
    const ttsStopName = makeTTS(stop.stop_name, modes);
    //
    updatedStops.push({
      stop_id: stop.stop_id,
      stop_name: stop.stop_name,
      tts_stop_name: ttsStopName,
    });

    if (stop.tts_stop_name != ttsStopName) {
      stop.tts_stop_name = ttsStopName;
      modifiedOriginalStops.push(stop);
    } //
  }

  // Create the output directory if it does not exist
  const dirname = 'outputs/tts-summary';
  const filename = 'stops_tts_summary.txt';
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

  // Save the formatted data into a CSV file
  process.stdout.clearLine();
  console.log('* Saving result to CSV file...');
  const csvDataSummary = Papa.unparse(updatedStops, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`${dirname}/${filename}`, csvDataSummary);

  // Required for Ricardo's validation workflow (diff)
  const csvDataSummaryModified = Papa.unparse(modifiedOriginalStops, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`stops_modified.txt`, csvDataSummaryModified);

  //
  console.log('* Processed ' + originalStops.data.length + ' stops.');
  const syncDuration = new Date() - start;
  console.log('* Run took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
