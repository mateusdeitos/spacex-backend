import { CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { V4CrewService } from 'src/crew/v4.crew.service';
import { ParseIdPipe } from 'src/parse-id.pipe';
import { ParsePaginationPipe } from 'src/parse-pagination.pipe';
import { LaunchesControllerResponse } from 'src/shared/types/launches';
import { TPagination } from 'src/shared/types/shared';
import { ParseLaunchDetailsInterceptor } from './parse-launch-details.interceptor';
import { ParseSingleLaunchInterceptor } from './parse-single-launch.interceptor';
import { V5LaunchesService } from './v5.launches.service';

@Controller('launches')
@UseInterceptors(CacheInterceptor)
export class LaunchesController {

	constructor(
		private readonly V5launchesService: V5LaunchesService,
		private readonly V4CrewService: V4CrewService,
	) { }

	@Get("/one/:id")
	@UseInterceptors(ParseLaunchDetailsInterceptor)
	public async one(@Param("id", ParseIdPipe) id: string): Promise<LaunchesControllerResponse.One> {
		const launch = await this.V5launchesService.getOne(id);

		let crew = [];
		if (launch.crew.length) {
			crew = await Promise.all(launch.crew.map(async ({ crew, role }) => {
				const crewDetails = await this.V4CrewService.getCrewDetails(crew);
				return {
					...crewDetails,
					role
				}
			}))
		}

		return {
			crew,
			launch
		}
	}

	@Get("/latest")
	@UseInterceptors(ParseSingleLaunchInterceptor)
	public latest() {
		return this.V5launchesService.getLatestLaunch();
	}

	@Get("/next")
	@UseInterceptors(ParseSingleLaunchInterceptor)
	public next() {
		return this.V5launchesService.getNextLaunch();
	}

	@Get("/summary/past")
	public async pastSummary(): Promise<LaunchesControllerResponse.TPastLaunchSummary> {
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

	@Get("/past")
	public past(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.V5launchesService.getPaginatedPastLaunches(limit, offset);
	}

	@Get("/summary/upcoming")
	public async upcomingSummary(): Promise<LaunchesControllerResponse.TUpcomingLaunchSummary> {
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

	@Get("/upcoming")
	public upcoming(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.V5launchesService.getPaginatedUpcomingLaunches(limit, offset);
	}

}
