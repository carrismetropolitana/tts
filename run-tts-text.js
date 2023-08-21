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
  console.log('> PARSER');
  const start = new Date();
  console.log('> Parsing started on ' + start.toISOString());

  //

  // 0.
  // Log progress
  console.log('• Parsing stops.txt file...');

  // 1.
  // Import stops.txt file
  const txtData = fs.readFileSync('stops.txt', { encoding: 'utf8' });

  // 2.
  // Parse csv file
  const originalStops = Papa.parse(txtData, { header: true });

  // 3.
  // Log progress
  console.log('• Preparing ' + originalStops.data.length + ' stops...');
  console.log();

  // 4.
  // Define variables to hold results
  const updatedStops = [];

  // 5.
  // Iterate on each stop to build
  for (const [index, stop] of originalStops.data.entries()) {
    //
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Updating stop ${stop.stop_id} (${index}/${originalStops.data.length})`);
    //
    const ttsStopName = makeTTS(stop.stop_name);
    //
    updatedStops.push({
      stop_id: stop.stop_id,
      stop_name: stop.stop_name,
      tts_stop_name: ttsStopName,
    });
    //
  }

  // 6.
  // Create the output directory if it does not exist
  const dirname = 'outputs/tts-summary';
  const filename = 'stops_tts_summary.txt';
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

  // 7.
  // Save the formatted data into a CSV file
  console.log('• Saving data to CSV file.');
  const csvDataSummary = Papa.unparse(updatedStops, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`${dirname}/${filename}`, csvDataSummary);

  // 8.
  // Log progress
  console.log('• Done! Updated ' + updatedStops.length + ' stops.');

  //

  const syncDuration = new Date() - start;
  console.log('> Operation took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
