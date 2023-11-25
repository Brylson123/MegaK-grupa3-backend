import { Module } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "./test.entity";
import { DatabaseModule } from "../database/database.module";

@Module({
	imports: [DatabaseModule],
	controllers: [TestController],
	providers: [TestService],
})
export class TestModule {}
