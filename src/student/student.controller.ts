import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StudentService } from "./student.service";
import { UpdateStudentDto } from "./dto/createStudentDto";
import { StudentEntity } from "./entities/student.entity";

@Controller("student")
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Get(":id")
	findOne(@Param("id") id: string): Promise<StudentEntity> {
		return this.studentService.findOne(id);
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
