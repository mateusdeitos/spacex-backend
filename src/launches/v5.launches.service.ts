import { Injectable } from '@nestjs/common';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { BaseService } from 'src/shared/services/base.service';
import { TRawLaunch } from 'src/shared/types/launches';

@Injectable()
export class V5LaunchesService extends BaseService {
	private baseUrl = 'https://api.spacexdata.com';
	private version = "v5";

	constructor(private readonly restClientProvider: RestClientProvider) {
		super();
	}

	public async getOne(id: string) {
		const response = await this.restClientProvider.get<TRawLaunch>(
			`${this.baseUrl}/${this.version}/launches/${id}`
		)

		return response;
	}

	public async getLatestLaunch() {
		const response = await this.restClientProvider.get<TRawLaunch>(
			`${this.baseUrl}/${this.version}/launches/latest`
		)

		return response;
	}

	public async getNextLaunch() {
		const response = await this.restClientProvider.get<TRawLaunch>(
			`${this.baseUrl}/${this.version}/launches/next`
		)

		return response;
	}

	public async getPastLaunches() {
		return this.restClientProvider.get<TRawLaunch[]>(
			`${this.baseUrl}/${this.version}/launches/past`
		)

	}
	public async getPaginatedPastLaunches(limit: number = 100, offset: number = 0) {
		const response = await this.getPastLaunches();
		return this.paginateResults(response.sort((a, b) => b.date_unix - a.date_unix), limit, offset);
	}

	public async getUpcomingLaunches() {
		return this.restClientProvider.get<TRawLaunch[]>(
			`${this.baseUrl}/${this.version}/launches/upcoming`
		)
	}

	public async getPaginatedUpcomingLaunches(limit: number = 100, offset: number = 0) {
		const response = await this.getUpcomingLaunches();
		return this.paginateResults(response, limit, offset);
	}
}
