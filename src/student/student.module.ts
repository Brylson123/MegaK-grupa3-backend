import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { DatabaseModule } from "../database/database.module";
import { HttpModule } from "@nestjs/axios";
import { ValidateCreateStudent } from "../utils/validateCreateStudent";
import { UserService } from "../user/user.service";
import {MailModule} from "../mail/mail.module";

@Module({
	imports: [DatabaseModule, HttpModule, MailModule],
	controllers: [StudentController],
	providers: [StudentService, ValidateCreateStudent, UserService],
	exports: [StudentService],
})
export class StudentModule {}
