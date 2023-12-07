import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateHrDto } from "../hr/dto/create-hr.dto";
import { CreateHrResponse } from "../types";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import { ActivateUserDto } from "../user/dto/activate-user.dto";

@Controller("/admin")
export class AdminController {
	constructor(
		private adminService: AdminService,
		private userService: UserService,
		private readonly mailService: MailService,
	) {}

	@Post("/addStudents")
	addStudents() {
		return this.adminService.addStudents();
	}

	@Post("/activateUser")
	activateUser(@Body() data: JSON) {
		return this.userService.sendActivationEmail(data);
	}

	@Post("/addHr")
	addHr(@Body() data: CreateHrDto): Promise<CreateHrResponse> {
		return this.adminService.addHr(data);
	}
}
