/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const Papa = require('papaparse');
const makeTTS = require('./services/makeTTS');
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

  // Read stops.txt file
  console.log('* Reading stops.txt file from disk...');
  const stopsTxt = fs.readFileSync('stops.txt', { encoding: 'utf8' });
  const stopsTxtData = Papa.parse(stopsTxt, { header: true });

  // Read tts_tracker.txt file
  console.log('* Reading tts_tracker.txt file from disk...');
  const ttsTracker = fs.readFileSync('tts_tracker.txt', { encoding: 'utf8' });
  const ttsTrackerData = Papa.parse(ttsTracker, { header: true });

  // Log progress
  console.log('* Preparing ' + stopsTxtData.data.length + ' stops...');

  // Define variable to hold results
  const updatedTtsTracker = [];
  let updatedTtsTrackerCount = 0;

  // Iterate on each stop
  for (const [index, stop] of stopsTxtData.data.entries()) {
    //
    process.stdout.clearLine();
    process.stdout.write(`* Processing stop ${stop.stop_id} (${index}/${stopsTxtData.data.length})`);
    process.stdout.cursorTo(0);

    // 1.
    // Generate fresh TTS for this stop
    let modes = (({ light_rail, subway, train, boat, bike_sharing, airport }) => ({ light_rail, subway, train, boat, bike_sharing, airport }))(stop);
    const ttsStopName = makeTTS(stop.stop_name, modes);

    // 2.
    // Check if tts_tracker already has this entry,
    // and if this entry tts_name differs from the generated TTS
    const trackerEntry = ttsTrackerData.data.find((item) => item.stop_id === stop.stop_id);
    const ttsHasChanged = ttsStopName !== trackerEntry?.tts_stop_name;

    // 3.
    // If TTS has changed, then generate a new audio file for this stop
    if (ttsHasChanged) {
      // 3.1.
      // If TTS has changed, then generate a new audio file for this stop
      try {
        stop.tts_stop_name = ttsStopName;
        //   await GoogleCloudTTSAPI(stop, true);
        updatedTtsTrackerCount++;
      } catch (error) {
        console.log(error);
      }
    }

    updatedTtsTracker.push(stop);

    //
  }
  //
  process.stdout.clearLine();

  // Required for Ricardo's validation workflow (diff)
  const csvDataUpdatedTtsTracker = Papa.unparse(updatedTtsTracker, { skipEmptyLines: 'greedy' });
  fs.writeFileSync(`tts_tracker.txt`, csvDataUpdatedTtsTracker);

  console.log('* Processed ' + stopsTxtData.data.length + ' stops.');
  console.log('* Updated ' + updatedTtsTrackerCount + ' stops.');
  const syncDuration = new Date() - start;
  console.log('* Run took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();
