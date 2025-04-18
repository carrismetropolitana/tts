/* * */

import { SETTINGS } from '@/config/settings';
import { runnerCommon } from '@/runners/runner_common';
import { runnerPatterns } from '@/runners/runner_patterns';
import { runnerStops } from '@/runners/runner_stops';
import LOGGER from '@helperkits/logger';

/* * */

(async function init() {
	//

	const runOnInterval = async () => {
		//

		await runnerCommon();
		await runnerStops();
		await runnerPatterns();

		//

		setTimeout(runOnInterval, SETTINGS.RUN_INTERVAL);

		LOGGER.divider();

		//
	};

	await runOnInterval();

	//
})();
