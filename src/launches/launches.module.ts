import { Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AxiosRestClientProvider } from 'src/shared/providers/axios-rest-client-provider';
import { RestClientProvider } from 'src/shared/providers/rest-client-provider';
import { LaunchesController } from './launches.controller';
import { LaunchesService } from './service/instances/abstract.launches.service';
import { LaunchesServiceFactory } from './service/launches.service.factory';

@Module({
	controllers: [LaunchesController],
	providers: [
		{
			provide: LaunchesService,
			useFactory(request: Request, restClientProvider: RestClientProvider) {
				return LaunchesServiceFactory.make(request.url, restClientProvider);
			},
			inject: [REQUEST, RestClientProvider]
		},
		{
			provide: RestClientProvider,
			useClass: AxiosRestClientProvider
		}
	]
})
export class LaunchesModule { }
