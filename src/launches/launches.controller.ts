import { CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { V4CrewService } from 'src/crew/v4.crew.service';
import { ParseIdPipe } from 'src/shared/pipes/parse-id.pipe';
import { ParsePaginationPipe } from 'src/shared/pipes/parse-pagination.pipe';
import { TGetCrewDetails } from 'src/shared/types/crew';
import { LaunchesControllerResponse } from 'src/shared/types/launches';
import { TPagination } from 'src/shared/types/shared';
import { ParseLaunchDetailsInterceptor } from './interceptors/parse-launch-details.interceptor';
import { ParseSingleLaunchInterceptor } from './interceptors/parse-single-launch.interceptor';
import { V5LaunchesService } from './v5.launches.service';

@Controller({
	path: 'launches',
	version: '1'
})
@UseInterceptors(CacheInterceptor)
/**
 * Controller to parse the data from the SpaceX API to a more readable format
 * to use in:
 * - the home page of the app
 * - the launch details page
 * - the launches list page
 */
export class LaunchesController {

	constructor(
		private readonly V5launchesService: V5LaunchesService,
		private readonly V4CrewService: V4CrewService,
	) { }

	@Get("/one/:id")
	@UseInterceptors(ParseLaunchDetailsInterceptor)
	public async one(@Param("id", ParseIdPipe) id: string): Promise<LaunchesControllerResponse.One> {
		const launch = await this.V5launchesService.getOne(id);

		let crew: TGetCrewDetails[] = [];
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

	@Get("/past")
	public past(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.V5launchesService.getPaginatedPastLaunches(limit, offset);
	}

	@Get("/upcoming")
	public upcoming(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.V5launchesService.getPaginatedUpcomingLaunches(limit, offset);
	}

}
