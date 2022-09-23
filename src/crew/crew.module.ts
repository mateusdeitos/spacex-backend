import { Module } from '@nestjs/common';
import { AxiosRestClientProvider } from 'src/shared/providers/axios-rest-client-provider';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { V4CrewService } from '../crew/v4.crew.service';

@Module({
	providers: [
		V4CrewService,
		{
			provide: RestClientProvider,
			useClass: AxiosRestClientProvider
		}
	],
	exports: [V4CrewService]
})
export class CrewModule { }
