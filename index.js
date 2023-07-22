/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const Papa = require('papaparse');
const makeTTS = require('./makeTTS');

const formatStops = async () => {
  //

  //
  // 0. Get latest data from Intermodal

  console.log('• Parsing latest stops...');

  const txtData = fs.readFileSync('stops.txt', { encoding: 'utf8' });

  const originalStops = Papa.parse(txtData, { header: true });

  //
  // 1. Format the raw data from Intermodal

  const updatedStops = [];
  const updatedStopsSummary = [];

  console.log('• Preparing ' + originalStops.data.length + ' stops...');
  console.log();

  for (const [index, stop] of originalStops.data.entries()) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Updating stop ${stop.stop_id} (${index}/${originalStops.data.length})`);
    //
    const ttsStopName = makeTTS(stop.stop_name);
    //
    updatedStops.push({
      ...stop,
      tts_stop_name: ttsStopName,
    });
    //
    updatedStopsSummary.push({
      stop_id: stop.stop_id,
      stop_name: stop.stop_name,
      tts_stop_name: ttsStopName,
    });
    //
  }

  //
  // 2. Save the formatted data into a JSON file

  console.log('• Saving data to CSV file.');

  // Use papaparse to produce the CSV string
  const csvData = Papa.unparse(updatedStops, { skipEmptyLines: 'greedy' });
  const csvDataSummary = Papa.unparse(updatedStopsSummary, { skipEmptyLines: 'greedy' });
  // Append the csv string to the file
  fs.writeFileSync(`stops_tts.txt`, csvData);
  fs.writeFileSync(`stops_tts_summary.txt`, csvDataSummary);

  //

  console.log('• Done! Updated ' + updatedStops.length + ' stops.');
};

/* * *
 * ONE TIME EXECUTION
 */
(async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('> PARSER');
  const start = new Date();
  console.log('> Parsing started on ' + start.toISOString());

  /* * * * * * * * * * * * */
  /* */ await formatStops();
  /* * * * * * * * * * * * */

  const syncDuration = new Date() - start;
  console.log('> Operation took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
