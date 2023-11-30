import { Injectable } from "@nestjs/common";
import { AddStudentsDto } from "./dto/addStudentsDto";
import { CreateHrDto } from "src/hr/dto/create-hr.dto";
import { createReadStream, readFileSync } from "fs";
import { StudentService } from "src/student/student.service";
import { UserService } from "src/user/user.service";
import { HrService } from "src/hr/hr.service";
import { CreateStudentDto } from "src/student/dto/createStudentDto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Injectable()
export class AdminService {
	constructor(
		private studentService: StudentService,
		private userService: UserService,
		private hrService: HrService,
	) {}

	parseCSV = () => {
		const csvFile = "src/data/dummyCSV.csv";
		const results = [];
		const csv = require("csv-parser"); //Czy z tego można zrobić import?

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

	addHr(data: CreateHrDto) {
		throw new Error("Method not implemented.");
		//Myśle, że trzeba przenieść dodawianie HR do admina, HR nie potrzebuje sam się dodawać.
	}
}
