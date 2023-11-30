import { Injectable } from "@nestjs/common";
import { CreateHrDto } from "src/hr/dto/create-hr.dto";
import { createReadStream } from "fs";
import { StudentService } from "src/student/student.service";
import { UserService } from "src/user/user.service";
import { HrService } from "src/hr/hr.service";
import { AuthService } from "../auth/auth.service";
import * as csv from "csv-parser";
import { v4 as uuid } from "uuid";
import { CreateHrResponse } from "../types";
import { CreateStudentDto } from "src/student/dto/createStudentDto";

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
					const courseCompletion = data.courseCompletion;
					const courseEngagement = data.courseEngagement;
					const projectDegree = data.projectDegree;
					const teamProjectDegree = data.teamProjectDegree;
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
		const students = await this.parseCSV();
		try {
			for (const student of students) {
				const studentId = await this.studentService.createStudent(student);
				createdStudents.push(studentId);
			}
			console.log(createdStudents);
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
