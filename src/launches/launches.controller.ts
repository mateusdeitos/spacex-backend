import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParseIdPipe } from 'src/parse-id.pipe';
import { ParsePaginationPipe } from 'src/parse-pagination.pipe';
import { TPagination } from 'src/shared/types/shared';
import { LaunchesService } from './service/instances/abstract.launches.service';

@Controller('launches')
export class LaunchesController {

	constructor(
		private readonly launchesService: LaunchesService,
	) { }

	@Get("/:id")
	public one(@Param("id", ParseIdPipe) id: string) {
		return this.launchesService.getOne(id);
	}

	@Get("/latest")
	public latest() {
		return this.launchesService.getLatestLaunch();
	}

	@Get("/next")
	public next() {
		return this.launchesService.getNextLaunch();
	}

	@Get("/past")
	public past(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.launchesService.getPastLaunches(limit, offset);
	}

	@Get("/upcoming")
	public upcoming(@Query(ParsePaginationPipe) { limit, offset }: TPagination) {
		return this.launchesService.getUpcomingLaunches(limit, offset);
	}
}
