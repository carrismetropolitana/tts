/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const Papa = require('papaparse');
const GoogleTranslateAPI = require('./services/GoogleTranslateAPI');
const GoogleCloudTTSAPI = require('./services/GoogleCloudTTSAPI');

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

  // 5.
  // Iterate on each stop to build
  for (const [index, stop] of originalStops.data.entries()) {
    //
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Updating stop ${stop.stop_id} (${index}/${originalStops.data.length})`);

    // OPTION A
    // This uses the free Google Translate API
    await GoogleTranslateAPI(stop);

    // OPTION B
    // This uses the paid Google Cloud TTS API, however with a generous free-tier
    // await GoogleCloudTTSAPI(stop);

    //
  }

  //

  const syncDuration = new Date() - start;
  console.log('> Operation took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
