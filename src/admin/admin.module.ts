import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { StudentService } from "src/student/student.service";
import { UserService } from "src/user/user.service";
import { HrService } from "src/hr/hr.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
	controllers: [AdminController],
	providers: [AdminService, StudentService, UserService, HrService],
})
export class AdminModule {}
