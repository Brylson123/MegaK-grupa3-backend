import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AddStudentsDto } from "./dto/addStudentsDto";
import { CreateHrDto } from "src/hr/dto/create-hr.dto";

@Controller("/admin")
export class AdminController {
    constructor(private adminService: AdminService) {}

	@Post("/addStudents")
	addStudents(@Body() data: AddStudentsDto) {
        this.adminService.addStudents(data);
    }

    @Post("/addHr") 
    addHr(@Body() data: CreateHrDto) {
        this.adminService.addHr(data);
    }
}
