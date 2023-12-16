import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { StudentService } from "./student.service";
import { UpdateStudentDto } from "./dto/createStudentDto";
import { MailService } from "../mail/mail.service";
import { StudentResponse, UserRole } from "../types";
import { Roles } from "../decorators/roles.decorator";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guards/roles.guard";

@Controller("student")
export class StudentController {
	constructor(
		private studentService: StudentService,
		private readonly mailService: MailService,
	) {}

	@Get("/email")
	testEmail() {
		this.mailService.sendMail("rnowosielski77@gmail.com", "test", "testowa wiadomość");
	}

	@Get(":id")
	@Roles(UserRole.STUDENT)
	@UseGuards(AuthGuard("jwt"), RolesGuard)
	findOne(@Param("id") id: string): Promise<StudentResponse> {
		return this.studentService.findOneStudent(id);
	}

	@Put(":id")
	@Roles(UserRole.STUDENT)
	@UseGuards(AuthGuard("jwt"), RolesGuard)
	updateStudent(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
		return this.studentService.updateStudent(id, updateStudentDto);
	}

	@Delete(":id")
	@Roles(UserRole.STUDENT)
	@UseGuards(AuthGuard("jwt"), RolesGuard)
	deleteStudent(@Param("id") id: string) {
		return this.studentService.deleteStudent(id);
	}
}
