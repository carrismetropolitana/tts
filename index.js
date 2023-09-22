const settings = require('./config/settings');
const runnerLines = require('./runners/runner_lines');
const runnerStops = require('./runners/runner_stops');

//

(async function init() {
  //

  let TASK_IS_RUNNING = false;

  await runnerLines();
  //   await runnerStops();

  setInterval(async () => {
    //
    // Check if task is already running
    if (TASK_IS_RUNNING) throw new Error('Force restart: Overlapping tasks.');

    TASK_IS_RUNNING = true;

    await runnerLines();
    // await runnerStops();

    TASK_IS_RUNNING = false;

    //
  }, settings.RUN_INTERVAL);

  //
})();
