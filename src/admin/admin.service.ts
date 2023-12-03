import { Injectable } from "@nestjs/common";
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
		private userService: UserService,
		private hrService: HrService,
		private authService: AuthService,
	) {}

	parseCSV = (): Promise<CreateStudentDto[]> => {
		const csvFile = "src/data/dummyCSV.csv";
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

	async addStudents() {
		const createdStudents = [];
		const students: CreateStudentDto[] = await this.parseCSV();
		try {
			for (const student of students) {
				const activationToken = this.authService.createToken(uuid());
				const response = await this.studentService.createStudent({
					...student,
					token: activationToken.accessToken,
				});
				if (response.isSuccess) {
					console.log(response);
				}
			}
			return {
				isSuccess: true,
				createdStudents: createdStudents.length,
				ids: createdStudents,
			};
		} catch (e) {
			return {
				isSuccess: false,
				message: e.message,
			};
		}
	}

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
