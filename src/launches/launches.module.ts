import { CacheModule, Module } from '@nestjs/common';
import { CrewModule } from 'src/crew/crew.module';
import { V4CrewService } from 'src/crew/v4.crew.service';
import { AxiosRestClientProvider } from 'src/shared/providers/axios-rest-client-provider';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { LaunchesController } from './launches.controller';
import { SummaryController } from './summary.controller';
import { V5LaunchesService } from './v5.launches.service';

@Module({
	imports: [
		CrewModule,
		CacheModule.register({
			ttl: 5 * 60,
		})
	],
	controllers: [LaunchesController, SummaryController],
	providers: [
		V4CrewService,
		V5LaunchesService,
		{
			provide: RestClientProvider,
			useClass: AxiosRestClientProvider
		}
	]
})
export class LaunchesModule { }
