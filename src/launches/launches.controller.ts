import { CacheInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { V4CrewService } from 'src/crew/v4.crew.service';
import { ParseIdPipe } from 'src/parse-id.pipe';
import { ParsePaginationPipe } from 'src/parse-pagination.pipe';
import { LaunchesControllerResponse, TGetLaunchDetails } from 'src/shared/types/launches';
import { TPagination } from 'src/shared/types/shared';
import { ParseLaunchDetailsInterceptor } from './parse-launch-details.interceptor';
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
	public latest() {
		return this.V5launchesService.getLatestLaunch();
	}

	@Get("/next")
	public next() {
		return this.V5launchesService.getNextLaunch();
	}

	@Get("/past")
	public past(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.V5launchesService.getPastLaunches(limit, offset);
	}

	@Get("/upcoming")
	public upcoming(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.V5launchesService.getUpcomingLaunches(limit, offset);
	}

}
