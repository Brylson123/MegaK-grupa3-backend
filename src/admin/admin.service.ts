import { Injectable } from "@nestjs/common";
import { AddStudentsDto } from "./dto/addStudentsDto";
import { CreateHrDto } from "src/hr/dto/create-hr.dto";
import { createReadStream, readFileSync } from "fs";

@Injectable()
export class AdminService {
	parseCSV = () => {
		const csvFile = "src/data/dummyCSV.csv";
		console.log(csvFile);
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

		return null;
	};

	addStudents() {
		this.parseCSV();
	}
	addHr(data: CreateHrDto) {
		throw new Error("Method not implemented.");
		//Myśle, że trzeba przenieść dodawianie HR do admina, HR nie potrzebuje sam się dodawać.
	}
}
