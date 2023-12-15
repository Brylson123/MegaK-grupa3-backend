import {
	Body,
	Controller,
	FileTypeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminService } from "./admin.service";
import { CreateHrDto } from "../hr/dto/create-hr.dto";
import { CreateHrResponse, UserRole } from "../types";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import { Express } from "express";
import { diskStorage } from "multer";
import { storageDir } from "../utils/storage";
import { Roles } from "../decorators/roles.decorator";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guards/roles.guard";
import { CreateStudentDto } from "../student/dto/createStudentDto";

@Controller("/admin")
export class AdminController {
	constructor(
		private adminService: AdminService,
		private userService: UserService,
		private readonly mailService: MailService,
	) {}

	@Post("/addStudents")
	@Roles(UserRole.ADMIN)
	@UseGuards(AuthGuard("jwt"), RolesGuard)
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				destination: storageDir(),
				filename: (req, file, callback) => {
					const filename = file.originalname;
					callback(null, filename);
				},
			}),
		}),
	)
	uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new FileTypeValidator({ fileType: "text/csv" })],
			}),
		)
		file: Express.Multer.File,
	) {
		return this.adminService.addStudents(file.path);
	}

	@Post("/addStudents/json")
	addStudentsFromJson(@Body() data: CreateStudentDto[]) {
		return this.adminService.createStudentsFromJson(data);
	}

	@Post("/addHr")
	@Roles(UserRole.ADMIN)
	@UseGuards(AuthGuard("jwt"), RolesGuard)
	addHr(@Body() data: CreateHrDto): Promise<CreateHrResponse> {
		return this.adminService.addHr(data);
	}
}
