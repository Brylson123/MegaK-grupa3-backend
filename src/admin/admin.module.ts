import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { StudentService } from "src/student/student.service";
import { UserService } from "src/user/user.service";
import { HrService } from "src/hr/hr.service";
import { HttpModule } from "@nestjs/axios";
import { UserModule } from "../user/user.module";
import { HrModule } from "../hr/hr.module";
import { StudentModule } from "../student/student.module";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [HttpModule, UserModule, HrModule, StudentModule, AuthModule],
	controllers: [AdminController],
	providers: [AdminService, StudentService, UserService, HrService],
})
export class AdminModule {}
