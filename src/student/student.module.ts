import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { DatabaseModule } from "../database/database.module";
import { HttpModule } from "@nestjs/axios";

@Module({
	imports: [DatabaseModule, HttpModule],
	controllers: [StudentController],
	providers: [StudentService],
	exports: [StudentService],
})
export class StudentModule {}
