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
		/**
		 * This cache is in-memory, so it will be lost when the app is restarted
		 * It caches the whole module, so it will cache all the endpoints related to launches
		 * ttl = time to live
		 */
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
			/**
			 * When a new library is added to the project to replace axios, just change the provider here
			 * and it will be used in the whole module
			 */
			useClass: AxiosRestClientProvider
		}
	]
})
export class LaunchesModule { }
