const fs = require('fs');
const axios = require('axios');
const googleTranslateApi = require('google-tts-api');

module.exports = async (stopData) => {
  //

  // Export settings
  const dirname = 'outputs/google-translate-api';
  const filename = `${stopData.stop_id}.mp3`;

  // Create the output directory if it does not exist
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });

  // Build the TTS audio URL
  const urlFreeUsingGoogleTranslate = googleTranslateApi.getAudioUrl(stopData.tts_stop_name, { lang: 'pt', slow: false });

  // Fetch the audio file
  const response = await axios({ method: 'get', url: urlFreeUsingGoogleTranslate, responseType: 'stream' });

  // Pipe the data into
  response.data.pipe(fs.createWriteStream(`${dirname}/${filename}`));

  //
  await new Promise((resolve, reject) => {
    response.data.on('end', resolve);
    response.data.on('error', reject);
  });

  //
};
