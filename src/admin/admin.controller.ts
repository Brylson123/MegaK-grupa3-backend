import { Body, Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminService } from "./admin.service";
import { CreateHrDto } from "../hr/dto/create-hr.dto";
import { AdminInsertStudent, CreateHrResponse } from "../types";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import { Express } from "express";
import { diskStorage } from "multer";
import { storageDir } from "../utils/storage";
import { AddStudentsDto } from "./dto/addStudentsDto";
import { StudentService } from "../student/student.service";
import { CreateStudentDto } from "src/student/dto/createStudentDto";

@Controller("/admin")
export class AdminController {
	constructor(
		private adminService: AdminService,
		private userService: UserService,
		private studentService: StudentService,
		private readonly mailService: MailService,
	) {}

	@Post("/addStudents")	
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: storageDir(),
				filename: (req, file, callback) => {
					const filename = file.originalname;
					callback(null, filename);
				}
			})
		})
		)
	uploadFile(@UploadedFile(
		new ParseFilePipe({
			validators: [new FileTypeValidator({fileType: 'text/csv'})],
		})
	) file: Express.Multer.File) {
		return this.adminService.addStudents(file.path);
	}

	@Post("/addStudents/json")
	addStudentsFromJson(@Body() data: CreateStudentDto[]) {
		return this.adminService.createStudentsFromJson(data);
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
