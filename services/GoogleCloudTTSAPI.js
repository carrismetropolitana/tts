/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const Papa = require('papaparse');
const googleTranslateApi = require('google-tts-api');
const textToSpeech = require('@google-cloud/text-to-speech');

const formatStops = async () => {
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
  // Create a new Google TTS client
  const googleCloudTTSClient = new textToSpeech.TextToSpeechClient();

  // 5.
  // Iterate on each stop to build
  for (const [index, stop] of originalStops.data.entries()) {
    //
    const filename = `${stop.stop_id}.mp3`;

    //
    // OPTION A
    // This uses the free Google Translate API
    const urlFreeUsingGoogleTranslate = googleTranslateApi.getAudioUrl(stop.stop_name, {
      lang: 'pt',
      slow: false,
      host: 'https://translate.google.com',
    });
    //
    await downloadMP3(urlFreeUsingGoogleTranslate, filename);

    //
    // OPTION B
    // This uses the paid Google Cloud TTS API, however with a generous free-tier
    const [response] = await googleCloudTTSClient.synthesizeSpeech({
      input: { text: stop.stop_name },
      voice: { name: 'pt-PT-Standard-D' }, // Can go from 'pt-PT-Standard-A' to 'pt-PT-Standard-D'
      audioConfig: { audioEncoding: 'MP3' },
    });
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(filename, response.audioContent, 'binary');
  }

  //
};

async function downloadMP3(url, outputFile) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    });

    response.data.pipe(fs.createWriteStream(outputFile));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        console.log('MP3 file saved:', outputFile);
        resolve();
      });
      response.data.on('error', (error) => {
        console.error('Error downloading MP3:', error.message);
        reject();
      });
    });
  } catch (error) {
    console.error('Failed to fetch MP3:', error.message);
  }
}

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
