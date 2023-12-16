import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DatabaseExceptionFilter } from "./filters/database-exceptionFilter";
import "reflect-metadata";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.enableCors({
		credentials: true,
		origin: "http://localhost:5137",
		allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	app.useGlobalFilters(new DatabaseExceptionFilter());
	app.use(cookieParser());
	await app.listen(3000);
}

bootstrap();
