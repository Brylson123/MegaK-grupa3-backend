import { Injectable, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateHrDto } from "../hr/dto/create-hr.dto";
import { createReadStream } from "fs";
import { StudentService } from "../student/student.service";
import { UserService } from "../user/user.service";
import { HrService } from "../hr/hr.service";
import { AuthService } from "../auth/auth.service";
import * as csv from "csv-parser";
import { v4 as uuid } from "uuid";
import { AdminInsertStudent, CreateHrResponse, UserRole } from "../types";
import { CreateStudentDto } from "../student/dto/createStudentDto";

@Injectable()
export class AdminService {
	constructor(
		private studentService: StudentService,
		private hrService: HrService,
		private authService: AuthService,
	) {}

	parseCSV = (csvFile: string): Promise<CreateStudentDto[]> => {
		// const csvFile = "src/data/dummyCSV.csv";
		const results = [];

		return new Promise((resolve, reject) => {
			createReadStream(csvFile)
				.pipe(
					csv({
						headers: [
							"email",
							"courseCompletion",
							"courseEngagement",
							"projectDegree",
							"teamProjectDegree",
							"bonusProjectUrls",
						],
						separator: ";",
						skipLines: 1,
					}),
				)
				.on("error", (error) => {
					reject(error);
				})
				.on("data", (data) => {
					const email = data.email;
					const courseCompletion = Number(data.courseCompletion);
					const courseEngagement = Number(data.courseEngagement);
					const projectDegree = Number(data.projectDegree);
					const teamProjectDegree = Number(data.teamProjectDegree);
					const bonusProjectUrls = data.bonusProjectUrls.split(";");

					results.push({
						email,
						courseCompletion,
						courseEngagement,
						projectDegree,
						teamProjectDegree,
						bonusProjectUrls,
					});
				})
				.on("end", () => {
					resolve(results);
					console.log("Parse csv in end ", results);
				});
		});
	};

	createStudentsFromArray = async (students: CreateStudentDto[]) => {
		try {
			const errors = [];
			const createdStudents = [];
			for (const student of students) {
				const activationToken = this.authService.createToken(uuid());
				const response = await this.studentService.createStudent({
					...student,
					token: activationToken.accessToken,
				});
				if (response.isSuccess) {
					console.log(response);
					createdStudents.push(response.studentId);
				} else {
					console.log(response);
					errors.push(response);
				}
			}
			return {
				isSuccess: true,
				cretedStudents: createdStudents.length,
				ids: createdStudents,
				errors: errors,
			};
		} catch (e) {
			return {
				isSuccess: false,
				message: e.message,
			};
		}
	}

	createStudentsFromJson(data: CreateStudentDto[]) {
		return this.createStudentsFromArray(data);
	}

	@UsePipes(new ValidationPipe())
	async addStudents(csvFile?: string) {
		const students: CreateStudentDto[] = await this.parseCSV(csvFile);
		return this.createStudentsFromArray(students);
	}

	@UsePipes(new ValidationPipe())
	async addHr(data: CreateHrDto): Promise<CreateHrResponse> {
		const activationToken = this.authService.createToken(uuid());
		try {
			const response = await this.hrService.createHr({
				...data,
				token: activationToken.accessToken,
			});
			if (response.isSuccess) {
				console.log(response);
			}
			return {
				isSuccess: true,
			};
		} catch (e) {
			return {
				isSuccess: false,
				message: e.message,
			};
		}
	}
}
