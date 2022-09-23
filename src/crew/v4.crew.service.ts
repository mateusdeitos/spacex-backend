import { Injectable } from '@nestjs/common';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { BaseService } from 'src/shared/services/base.service';
import { TCrewDetails } from 'src/shared/types/crew';

@Injectable()
export class V4CrewService extends BaseService {
	private baseUrl = 'https://api.spacexdata.com';
	private version = "v4";

	constructor(private readonly restClientProvider: RestClientProvider) {
		super();
	}

	public async getCrewDetails(id: string) {
		const response = await this.restClientProvider.get<TCrewDetails>(
			`${this.baseUrl}/${this.version}/crew/${id}`
		)

		return response;
	}
}
