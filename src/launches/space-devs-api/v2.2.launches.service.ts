import { Injectable } from '@nestjs/common';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { BaseService } from 'src/shared/services/base.service';
import { TRawLaunch } from 'src/shared/types/launches';
import { SpaceDevsApi } from 'src/shared/types/space-devs-api/launches';

@Injectable()
export class V2_2LaunchesService extends BaseService {
	private baseUrl = 'https://ll.thespacedevs.com';
	private version = "2.2.0";

	constructor(private readonly restClientProvider: RestClientProvider) {
		super();
	}

	private buildParams(params: Record<string, any> = {}): Record<string, any> {
		return {
			...params,
			search: "SpaceX"
		}
	}

	public async getOne(id: string) {
		const response = await this.restClientProvider.get<SpaceDevsApi.Launches.ISingle>(
			`${this.baseUrl}/${this.version}/launch/${id}`
		)

		return response;
	}

	public async getLatestLaunch() {
		const response = await this.getPastLaunches(1);

		return response;
	}

	public async getNextLaunch() {
		const response = await this.getUpcomingLaunches(1)

		return response;
	}

	public async getPastLaunches(limit = 100, offset = 0) {
		return this.restClientProvider.get<SpaceDevsApi.Launches.ISingle[]>(
			`${this.baseUrl}/${this.version}/launch/previous`,
			this.buildParams({
				ordering: "net",
				limit,
				offset,
			})
		)

	}

	public async getUpcomingLaunches(limit = 100, offset = 0) {
		return this.restClientProvider.get<SpaceDevsApi.Launches.ISingle[]>(
			`${this.baseUrl}/${this.version}/launch/upcoming`,
			this.buildParams({
				ordering: "-net",
				limit,
				offset,
			})
		)
	}
}
