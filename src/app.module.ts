import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CrewModule } from './crew/crew.module';
import { GlobalErrorHandlerFilter } from './global-error-handler.filter';
import { LaunchesModule } from './launches/launches.module';

@Module({
	imports: [LaunchesModule, CrewModule, ConfigModule.forRoot({ isGlobal: true })],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GlobalErrorHandlerFilter,
		},
	],
})
export class AppModule { }
