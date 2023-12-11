import {Body, Controller, Get, Param, Patch, UseGuards} from "@nestjs/common";
import { HrService } from "./hr.service";
import {
	DisinterestStudentResponse, HiredStudentResponse,
	ReservationStudentResponse,
	StudentInterface,
	StudentsToInterviewResponse,
	UserRole,
	viewAllActiveStudentsResponse,
} from "../types";
import { StudentService } from "../student/student.service";
import { ActiveStudentsDto } from "../student/dto/active-studnets.dto";
import { UserObj } from "../decorators/user-obj.decorator";
import { UserEntity } from "../user/entity/user.entity";
import { ReservationStudentDto } from "../student/dto/reservation-student.dto";
import { AuthGuard } from "@nestjs/passport";
import { DisinterestStudentDto } from "../student/dto/disinterest-student.dto";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";
import {HiredStudentDto} from "../student/dto/hired-student";

@Controller("/hr")
export class HrController {
	constructor(
		private readonly hrService: HrService,
		private readonly studentService: StudentService,
	) {}

	@Get("/students")
	@Roles(UserRole.HR)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	viewAllStudents(@Body() req: ActiveStudentsDto): Promise<viewAllActiveStudentsResponse> {
		return this.studentService.viewAllActiveStudents(req);
	}

	@Get("/students/interview")
	@Roles(UserRole.HR)
	@UseGuards(AuthGuard("jwt"), RolesGuard)
	viewAllStudentsToInterview(
		@Body() req: ActiveStudentsDto,
		@UserObj() user: UserEntity,
	): Promise<StudentsToInterviewResponse> {
		return this.studentService.findAllToInterview(req, user);
	}
	@Get("/students/cv/:id")
	@Roles(UserRole.HR)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	showStudentInfo(@Param("id") id: string): Promise<StudentInterface> {
		return this.studentService.findOne(id);
	}

	@Patch("/students/reservation")
	@Roles(UserRole.HR)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	reservation(
		@Body() ReservationStudentDto: ReservationStudentDto,
		@UserObj() user: UserEntity,
	): Promise<ReservationStudentResponse> {
		return this.studentService.reservation(ReservationStudentDto, user);
	}

	@Patch('/students/hired')
	@Roles(UserRole.HR)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	hired(
		@Body() hiredStudentDto: HiredStudentDto,
		@UserObj() user: UserEntity,
	): Promise<HiredStudentResponse> {
		return this.studentService.hired(user, hiredStudentDto);
	}
	@Patch("/students/disinterest")
	@Roles(UserRole.HR)
	@UseGuards(AuthGuard('jwt'), RolesGuard)
	disinterest(
		@Body() disinterestStudentDto: DisinterestStudentDto,
	): Promise<DisinterestStudentResponse> {
		return this.studentService.disinterest(disinterestStudentDto);
	}
}
