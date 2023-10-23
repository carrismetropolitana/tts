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
    { id: 'last_stop', text: 'Fim de Percurso. ( Obrigado por viajar ) com a Carris Metropolitana!' },
    { id: 'no_dropoff_a', text: 'Esta paragem só permite entradas.' },
    { id: 'no_dropoff_b', text: 'Não é possível sair nesta paragem.' },
    { id: 'no_dropoff_c', text: 'Por ser em Lisboa, não é possível sair nesta paragem.' },
    { id: 'no_dropoff_d', text: 'Por ser em Lisboa, não é permitido desembarque.' },
    { id: 'no_dropoff_e', text: 'Não é permitido desembarque em Lisboa.' },
    { id: 'no_dropoff_f', text: 'Não pode sair aqui.' },
    { id: 'no_dropoff_g', text: 'Pedimos desculpa, este serviço não permite saídas nesta paragem.' },
    { id: 'no_dropoff_h', text: 'Pedimos desculpa, este serviço não permite saídas em Lisboa.' },
    { id: 'no_dropoff_i', text: 'Pedimos desculpa, este serviço não faz saídas dentro da cidade de Lisboa.' },
    { id: 'no_dropoff_j', text: 'Sem desembarque: este serviço é exclusivo para saídas fora de Lisboa.' },
    { id: 'no_dropoff_k', text: 'Paragem sem desembarque.' },
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
