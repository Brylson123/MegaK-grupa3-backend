import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { DatabaseModule } from "../database/database.module";
import { HttpModule } from "@nestjs/axios";
import { ValidateCreateStudent } from "src/utils/validateCreateStudent";
import { UserService } from "src/user/user.service";

@Module({
	imports: [DatabaseModule, HttpModule],
	controllers: [StudentController],
	providers: [StudentService, ValidateCreateStudent, UserService],
	exports: [StudentService],
})
export class StudentModule {}
