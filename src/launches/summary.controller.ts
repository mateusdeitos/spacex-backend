import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { LaunchesControllerResponse } from 'src/shared/types/launches';
import { V5LaunchesService } from './v5.launches.service';

@Controller({
	path: 'launches/summary',
	version: '1'
})
@UseInterceptors(CacheInterceptor)
/**
 * Controller to parse the data from the SpaceX API to a more readable format
 * to use in the home page of the app
 */
export class SummaryController {

	constructor(
		private readonly V5launchesService: V5LaunchesService,
	) { }

	@Get("/past")
	public async past(): Promise<LaunchesControllerResponse.TPastLaunchSummary> {
		const response = await this.V5launchesService.getPastLaunches();

		return response.reduce<LaunchesControllerResponse.TPastLaunchSummary>((acc, launch) => {
			if (launch.success) {
				acc.successfulFlights++;
			} else {
				acc.failedFlights++;
			}

			acc.totalFlights++;
			return acc;
		}, { failedFlights: 0, successfulFlights: 0, totalFlights: 0 })
	}

	@Get("/upcoming")
	public async upcoming(): Promise<LaunchesControllerResponse.TUpcomingLaunchSummary> {
		const response = await this.V5launchesService.getUpcomingLaunches();

		const currentMonth = new Date().getMonth();
		const nextMonth = currentMonth + 1;

		const isCurrentMonth = (date: Date) => date.getMonth() === currentMonth;
		const isNextMonth = (date: Date) => date.getMonth() === nextMonth;

		return response.reduce<LaunchesControllerResponse.TUpcomingLaunchSummary>((acc, launch) => {
			if (!!launch?.date_utc) {
				const date = new Date(launch.date_utc);
				if (isCurrentMonth(date)) {
					acc.flightsPerMonth.currentMonth++;
				} else if (isNextMonth(date)) {
					acc.flightsPerMonth.nextMonth++;
				}
			}

			acc.totalFlights++;
			return acc;
		}, { flightsPerMonth: { currentMonth: 0, nextMonth: 0 }, totalFlights: 0 })
	}

}
