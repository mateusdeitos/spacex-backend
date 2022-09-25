import { Module } from '@nestjs/common';
import { AxiosRestClientProvider } from 'src/shared/providers/axios-rest-client-provider';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { V4CrewService } from '../crew/v4.crew.service';

@Module({
	providers: [
		V4CrewService,
		{
			provide: RestClientProvider,
			/**
			 * When a new library is added to the project to replace axios, just change the provider here
			 * and it will be used in the whole module
			 */
			useClass: AxiosRestClientProvider
		}
	],
	exports: [V4CrewService]
})
export class CrewModule { }
