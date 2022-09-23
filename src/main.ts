import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: { methods: ["GET"], origin: process.env.FRONTEND_URL } });
	await app.listen(process.env.PORT || 3333);
}
bootstrap();
