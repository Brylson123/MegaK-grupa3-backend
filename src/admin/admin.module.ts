import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { StudentService } from "../student/student.service";
import { UserService } from "../user/user.service";
import { HrService } from "../hr/hr.service";
import { HttpModule } from "@nestjs/axios";
import { UserModule } from "../user/user.module";
import { HrModule } from "../hr/hr.module";
import { StudentModule } from "../student/student.module";
import { AuthModule } from "../auth/auth.module";
import { ValidateCreateStudent } from "../utils/validateCreateStudent";
import { MailModule } from "../mail/mail.module";

@Module({
	imports: [HttpModule, UserModule, HrModule, StudentModule, AuthModule, MailModule],
	controllers: [AdminController],
	providers: [AdminService, StudentService, UserService, HrService, ValidateCreateStudent],
})
export class AdminModule {}
