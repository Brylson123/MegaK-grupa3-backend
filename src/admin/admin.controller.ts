import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateHrDto } from "../hr/dto/create-hr.dto";
import { CreateHrResponse } from "../types";

@Controller("/admin")
export class AdminController {
	constructor(private adminService: AdminService) {}

	@Post("/addStudents")
	addStudents() {
		return this.adminService.addStudents();
	}

	@Post("/addHr")
	addHr(@Body() data: CreateHrDto): Promise<CreateHrResponse> {
		return this.adminService.addHr(data);
	}
}
