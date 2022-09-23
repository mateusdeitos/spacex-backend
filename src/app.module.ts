import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalErrorHandlerFilter } from './global-error-handler.filter';
import { LaunchesModule } from './launches/launches.module';

@Module({
	imports: [LaunchesModule, ConfigModule.forRoot({ isGlobal: true })],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GlobalErrorHandlerFilter,
		},
	],
})
export class AppModule { }
