import { Injectable } from '@nestjs/common';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { BaseService } from 'src/shared/services/base.service';
import { TLaunch } from 'src/shared/types/launches';

@Injectable()
export abstract class LaunchesService extends BaseService {
	protected abstract baseUrl: string;
	protected abstract version: string;
	constructor(private readonly restClientProvider: RestClientProvider) {
		super();
	}

	public async getOne(id: string) {
		const response = await this.restClientProvider.get<TLaunch>(
			`${this.baseUrl}/${this.version}/launches/${id}`
		)

		return response;
	}

	public async getLatestLaunch() {
		const response = await this.restClientProvider.get<TLaunch>(
			`${this.baseUrl}/${this.version}/launches/latest`
		)

		return response;
	}

	public async getNextLaunch() {
		const response = await this.restClientProvider.get<TLaunch>(
			`${this.baseUrl}/${this.version}/launches/next`
		)

		return response;
	}

	public async getPastLaunches(limit: number = 100, offset: number = 0) {
		const response = await this.restClientProvider.get<TLaunch[]>(
			`${this.baseUrl}/${this.version}/launches/past`
		)

		return this.paginateResults(response, limit, offset);
	}

	public async getUpcomingLaunches(limit: number = 100, offset: number = 0) {
		const response = await this.restClientProvider.get<TLaunch[]>(
			`${this.baseUrl}/${this.version}/launches/upcoming`
		)

		return this.paginateResults(response, limit, offset);
	}
}
