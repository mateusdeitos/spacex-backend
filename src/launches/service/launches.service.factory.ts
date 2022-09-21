import { RestClientProvider } from "src/shared/providers/rest-client-provider";
import { LaunchesService } from "./instances/abstract.launches.service";
import { V5LaunchesService } from "./instances/v5.launches.service";

export class LaunchesServiceFactory {

	public static make(urlRequest: string, restClient: RestClientProvider): LaunchesService {
		const getFallbackInstance = () => new V5LaunchesService(restClient);

		const mapInstances: Array<{ urls: string[] | "*", getInstance: () => LaunchesService }> = [
			{
				urls: "*",
				getInstance: () => new V5LaunchesService(restClient),
			},
		];

		return mapInstances
			.find(item => item.urls === "*" || item.urls.includes(urlRequest))?.getInstance()
			?? getFallbackInstance();
	}
}