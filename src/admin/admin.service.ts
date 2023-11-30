import { Injectable } from "@nestjs/common";
import { CreateHrDto } from "src/hr/dto/create-hr.dto";
import { createReadStream } from "fs";
import { StudentService } from "src/student/student.service";
import { UserService } from "src/user/user.service";
import { HrService } from "src/hr/hr.service";
import { AuthService } from "../auth/auth.service";
import csv from "csv-parser";
import { v4 as uuid } from "uuid";
import { CreateHrResponse } from "../types";

@Injectable()
export class AdminService {
	constructor(
		private studentService: StudentService,
		private userService: UserService,
		private hrService: HrService,
		private authService: AuthService,
	) {}

	parseCSV = () => {
		const csvFile = "src/data/dummyCSV.csv";
		const results = [];
		createReadStream(csvFile)
			.pipe(
				csv({
					headers: [
						"email",
						"courseCompletion",
						"courseEngagment",
						"projectDegree",
						"teamProjectDegree",
						"bonusProjectUrls",
					],
					separator: ";",
					skipLines: 1,
				}),
			)
			.on("data", (data) => {
				const email = data.email;
				const courseCompletion = data.courseCompletion;
				const courseEngagment = data.courseEngagment;
				const projectDegree = data.projectDegree;
				const teamProjectDegree = data.teamProjectDegree;
				const bonusProjectUrls = data.bonusProjectUrls.split(";");

				results.push({
					email,
					courseCompletion,
					courseEngagment,
					projectDegree,
					teamProjectDegree,
					bonusProjectUrls,
				});
			})
			.on("end", () => {
				console.log(results);
			});
		return results;
	};

	async addStudents() {
		const students = this.parseCSV(); //Nie wiem czemy to nic nie zwraca
		console.log("In addStudents", students); //ta linijka wykonuje się przed this.parseCSV(), dlaczego?
		try {
			students.forEach(async (student) => {
				await this.studentService.createStudent(student);
				console.log(student);
			});
			return {
				isSuccess: true,
			};
		} catch (e) {
			return {
				isSuccess: false,
				error: e.message,
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
