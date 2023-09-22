const settings = require('./config/settings');
const runnerPatterns = require('./runners/runner_patterns');
const runnerStops = require('./runners/runner_stops');

//

(async function init() {
  //

  let TASK_IS_RUNNING = false;

  await runnerPatterns();
  await runnerStops();

  setInterval(async () => {
    //
    // Check if task is already running
    if (TASK_IS_RUNNING) throw new Error('Force restart: Overlapping tasks.');

    TASK_IS_RUNNING = true;

    await runnerPatterns();
    await runnerStops();

    TASK_IS_RUNNING = false;

    //
  }, settings.RUN_INTERVAL);

  //
})();
