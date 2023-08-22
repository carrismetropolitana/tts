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
  console.log('* TTS AUDIO');
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

  // 4.
  // Iterate on each stop
  for (const [index, stop] of originalStops.data.entries()) {
    //
    process.stdout.clearLine();
    process.stdout.write(`* Processing stop ${stop.stop_id} (${index}/${originalStops.data.length})`);
    process.stdout.cursorTo(0);

    // OPTION A
    // This uses the free Google Translate API
    await GoogleTranslateAPI(stop);

    // OPTION B
    // This uses the paid Google Cloud TTS API, however with a generous free-tier
    // await GoogleCloudTTSAPI(stop);

    //
  }

  //
  process.stdout.clearLine();
  console.log('* Processed ' + originalStops.data.length + ' stops.');
  const syncDuration = new Date() - start;
  console.log('* Run took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
