/* * * * * */
/* MAKE TTS STOP NAMES */
/* * */
/* * */

/* * */
/* IMPORTS */
const fs = require('fs');
const Papa = require('papaparse');
const { Client } = require('@googlemaps/google-maps-services-js');

const formatSchools = async () => {
  //

  //
  // 0. Get latest data from Intermodal

  console.log('• Parsing latest schools...');

  const txtData = fs.readFileSync('schools.txt', { encoding: 'utf8' });

  const originalSchools = Papa.parse(txtData, { header: true });

  //
  // 1. Format the raw data from Intermodal

  const updatedSchools = [];
  const updatedSchoolsSummary = [];

  console.log('• Preparing ' + originalSchools.data.length + ' schools...');
  console.log();

  for (const [index, school] of originalSchools.data.entries()) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Updating school ${school.code} (${index}/${originalSchools.data.length})`);
    //
    try {
      const API_KEY = 'AIzaSyDZDyp72mZLg6fIDmcNuF6wgsVhXKf58ns';
      const client = new Client({});
      const response = await client.findPlaceFromText({
        params: {
          input: school.name,
          inputtype: 'textquery',
          language: 'pt',
          fields: ['geometry', 'place_id'],
          key: API_KEY,
        },
        timeout: 1000, // milliseconds
      });
      //
      updatedSchools.push({
        ...school,
        coordinates_lat: response.data.candidates[0].geometry.location.lat,
        coordinates_lon: response.data.candidates[0].geometry.location.lng,
      });
      //
      updatedSchoolsSummary.push({
        school_id: school.school_id,
        school_name: school.school_name,
        coordinates_lat: response.data.candidates[0].geometry.location.lat,
        coordinates_lon: response.data.candidates[0].geometry.location.lng,
      });
    } catch (error) {
      console.log(error);
    }
    await delay(250);
    //
  }

  //
  // 2. Save the formatted data into a JSON file

  console.log('• Saving data to CSV file.');

  // Use papaparse to produce the CSV string
  const csvData = Papa.unparse(updatedSchools, { skipEmptyLines: 'greedy' });
  const csvDataSummary = Papa.unparse(updatedSchoolsSummary, { skipEmptyLines: 'greedy' });
  // Append the csv string to the file
  fs.writeFileSync(`schools_tts.txt`, csvData);
  fs.writeFileSync(`schools_tts_summary.txt`, csvDataSummary);

  //

  console.log('• Done! Updated ' + updatedSchools.length + ' schools.');
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
  /* */ await formatSchools();
  /* * * * * * * * * * * * */

  const syncDuration = new Date() - start;
  console.log('> Operation took ' + syncDuration / 1000 + ' seconds.');
  console.log('* * * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log();
})();

function delay(miliseconds = 0) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}
