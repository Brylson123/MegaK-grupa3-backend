import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { DatabaseModule } from "../database/database.module";
import { HttpModule } from "@nestjs/axios";
import { MailerService } from "@nest-modules/mailer";
import { MailModule } from "src/mail/mail.module";

@Module({
	imports: [DatabaseModule, HttpModule, MailModule],
	controllers: [StudentController],
	providers: [StudentService],
	exports: [StudentService],
})
export class StudentModule {}
