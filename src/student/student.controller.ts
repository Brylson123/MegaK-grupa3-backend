import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentService } from "./student.service";
import { UpdateStudentDto } from "./dto/createStudentDto";
import { StudentEntity } from "./entities/student.entity";
import { MailService } from "../mail/mail.service";
import { StudentResponse } from "../types";

@Controller("student")
export class StudentController {
	constructor(
		private studentService: StudentService, 
		private readonly mailService: MailService,
		) {}

	@Get(":id")
	findOne(@Param("id") id: string): Promise<StudentResponse> {
		return this.studentService.findOneStudent(id);
	}

	@Get("/email")
	testEmail() {
		return this.mailService.sendMail;
	}
	
	@Put(":id")
	updateStudent(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
		return this.studentService.updateStudent(id, updateStudentDto);
	}

	@Delete(":id")
	deleteStudent(@Param("id") id: string) {
		return this.studentService.deleteStudent(id);
	}
}
