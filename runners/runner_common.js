const settings = require('../config/settings');
const Tracker = require('../services/Tracker');
const GoogleCloudTTSAPI = require('../services/GoogleCloudTTSAPI');

/* * */

module.exports = async () => {
  console.log();
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log('* TTS COMMON');
  const start = new Date();
  console.log(`* Run started on ${start.toISOString()}`);

  // Setup tracker
  const trackerData = Tracker.get('common');
  const trackerDataUpdated = [];

  // Define common sayings
  const allCommonData = [
    { id: 'next_stop', text: 'Seguinte' },
    { id: 'last_stop', text: 'Fim de Percurso. Obrigado por viajar com a Carris Metropolitana!' },
  ];

  // Log progress
  console.log(`* Preparing ${allCommonData.length} common sayings...`);
  console.log();

  // Iterate on each common saying
  for (const [commonIndex, commonData] of allCommonData.entries()) {
    //

    // Check if tracker already has this entry,
    // and if it differs from the given TTS.
    const trackerEntry = trackerData.find((item) => item.id === commonData.id);
    const ttsHasChanged = commonData.text !== trackerEntry?.tts;

    if (ttsHasChanged) {
      await GoogleCloudTTSAPI({ string: commonData.text, filename: commonData.id, dirname: `${settings.OUTPUTS_DIRNAME}/common`, replaceIfExists: true });
      console.log(`* [${commonIndex}/${allCommonData.length}] Generated | Stop ${commonData.id} | ${commonData.text}`);
    }

    trackerDataUpdated.push({ id: commonData.id, tts: commonData.text });

    //
  }

  // Save updated tracker
  Tracker.set('common', trackerDataUpdated);

  // Clean directory
  Tracker.clean('common');

  // Zip directory
  Tracker.zip('common');

  //
  console.log();
  console.log(`* Processed ${trackerDataUpdated.length} common.`);
  const syncDuration = new Date() - start;
  console.log(`* Run took ${syncDuration / 1000} seconds.`);
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
};
