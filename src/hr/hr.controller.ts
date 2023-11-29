import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { HrService } from "./hr.service";
import { InsertHr, StudentInterface, viewAllActiveStudentsResponse } from "../types";
import { StudentService } from "../student/student.service";
import { ActiveStudentsDto } from "../student/dto/active-studnets.dto";

@Controller("/hr")
export class HrController {
	constructor(
		private readonly hrService: HrService,
		private readonly studentService: StudentService,
	) {}
	@Post("/addHr")
	createNewHr(@Body() body: InsertHr) {
		return this.hrService.createHr(body);
	}

	@Get("/students")
	viewAllStudents(@Body() req: ActiveStudentsDto): Promise<viewAllActiveStudentsResponse> {
		return this.studentService.viewAllActiveStudents(req);
	}

	@Get("/students/cv/:id")
	showStudentInfo(@Param("id") id: string): Promise<StudentInterface> {
		return this.studentService.findOne(id);
	}
}
