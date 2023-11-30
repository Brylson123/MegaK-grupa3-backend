import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { HrService } from "./hr.service";
import {
	InsertHr,
	StudentInterface,
	StudentsToInterviewResponse,
	viewAllActiveStudentsResponse,
} from "../types";
import { StudentService } from "../student/student.service";
import { ActiveStudentsDto } from "../student/dto/active-studnets.dto";
import { UserObj } from "../decorators/user-obj.decorator";
import { UserEntity } from "../user/entity/user.entity";

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

	@Get("/students/interview")
	viewAllStudentsToInterview(
		@Body() req: ActiveStudentsDto,
		@UserObj() user: UserEntity,
	): Promise<StudentsToInterviewResponse> {
		return this.studentService.findAllToInterview(req, user);
	}
	@Get("/students/cv/:id")
	showStudentInfo(@Param("id") id: string): Promise<StudentInterface> {
		return this.studentService.findOne(id);
	}
}
