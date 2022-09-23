import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalErrorHandlerFilter } from './global-error-handler.filter';
import { LaunchesModule } from './launches/launches.module';

@Module({
	imports: [LaunchesModule, ConfigModule.forRoot({ isGlobal: true })],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: GlobalErrorHandlerFilter,
		},
	],
})
export class AppModule { }
