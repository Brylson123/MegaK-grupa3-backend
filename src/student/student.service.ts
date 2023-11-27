import { Injectable } from "@nestjs/common";
import { CreateStudentDto, UpdateStudentDto } from "./dto/createStudentDto";
import { Student } from "./entities/student.entity";
import { BonusProjectUrl } from "./entities/bonusProjectUrls.entity";
import { ProjectUrl } from "./entities/projectUrl.entity";
import { PortfolioUrl } from "./entities/portfolioUrl.entity";
import { In } from "typeorm";

@Injectable()
export class StudentService {
	async findAll() {
		return await Student.find({
			relations: {
				projectUrls: true,
				bonusProjectUrls: true,
				portfolioUrls: true,
			},
		});
	}

	async findOne(id: string) {
		return await Student.findOne({
			where: { id: id },
			relations: {
				projectUrls: true,
				bonusProjectUrls: true,
				portfolioUrls: true,
			},
		});
	}

	async createStudent(createStudentDto: CreateStudentDto) {
		const student = new Student();
		try {
			student.bio = createStudentDto.bio;
			student.canTakeApprenticeship = createStudentDto.canTakeApprenticeship;
			student.courseCompletion = createStudentDto.courseCompletion;
			student.courseEngagment = createStudentDto.courseEngagment;
			student.courses = createStudentDto.courses;
			student.education = createStudentDto.education;
			student.expectedContractType = createStudentDto.expectedContractType;
			student.expectedSalary = createStudentDto.expectedSalary;
			student.expectedTypeWork = createStudentDto.expectedTypeWork;
			student.firstName = createStudentDto.firstName;
			student.gitHubUserName = createStudentDto.gitHubUserName;
			student.lastName = createStudentDto.lastName;
			student.monthsOfCommercialExp = createStudentDto.monthsOfCommercialExp;
			student.projectDegree = createStudentDto.projectDegree;
			student.status = createStudentDto.status;
			student.targetWorkCity = createStudentDto.targetWorkCity;
			student.teamProjectDegree = createStudentDto.teamProjectDegree;
			student.tel = createStudentDto.tel;
			student.workExperience = createStudentDto.workExperience;
			await student.save();
			if (createStudentDto.projectUrls.length > 0) {
				createStudentDto.projectUrls.forEach((url) => {
					const projectUrl = new ProjectUrl();
					projectUrl.student = student;
					projectUrl.projectUrl = url;
					projectUrl.save();
				});
			}
			if (createStudentDto.bonusProjectUrls.length > 0) {
				createStudentDto.bonusProjectUrls.forEach((url) => {
					const bonusProjectUrl = new BonusProjectUrl();
					bonusProjectUrl.student = student;
					bonusProjectUrl.bonusProjectUrl = url;
					bonusProjectUrl.save();
				});
			}
			if (createStudentDto.portfolioUrls.length > 0) {
				createStudentDto.portfolioUrls.forEach((url) => {
					const portfolioUrl = new PortfolioUrl();
					portfolioUrl.student = student;
					portfolioUrl.portfolioUrl = url;
					portfolioUrl.save();
				});
			}
			return student.id;
		} catch (e) {
			return e;
		}
	}

	async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
		const student = await Student.findOne({ 
			where: { id: id },
			relations: [
				"projectUrls",
				"portfolioUrls",
				"bonusProjectUrls",
			]
		});
		try {
			student.bio = updateStudentDto.bio;
			student.canTakeApprenticeship = updateStudentDto.canTakeApprenticeship;
			student.courseCompletion = updateStudentDto.courseCompletion;
			student.courseEngagment = updateStudentDto.courseEngagment;
			student.courses = updateStudentDto.courses;
			student.education = updateStudentDto.education;
			student.expectedContractType = updateStudentDto.expectedContractType;
			student.expectedSalary = updateStudentDto.expectedSalary;
			student.expectedTypeWork = updateStudentDto.expectedTypeWork;
			student.firstName = updateStudentDto.firstName;
			student.gitHubUserName = updateStudentDto.gitHubUserName;
			student.lastName = updateStudentDto.lastName;
			student.monthsOfCommercialExp = updateStudentDto.monthsOfCommercialExp;
			student.projectDegree = updateStudentDto.projectDegree;
			student.status = updateStudentDto.status;
			student.targetWorkCity = updateStudentDto.targetWorkCity;
			student.teamProjectDegree = updateStudentDto.teamProjectDegree;
			student.tel = updateStudentDto.tel;
			student.workExperience = updateStudentDto.workExperience;
			await student.save();

			if (updateStudentDto.projectUrls.length > 0) {
				await ProjectUrl.remove(student.projectUrls);
				await updateStudentDto.projectUrls.forEach(url => {
					let projectUrl = new ProjectUrl();
					projectUrl.student = student;
					projectUrl.projectUrl = url;
					projectUrl.save();
				});
			}
			await BonusProjectUrl.remove(student.bonusProjectUrls);
			if (updateStudentDto.bonusProjectUrls) {
				await BonusProjectUrl.remove(student.bonusProjectUrls);
				await updateStudentDto.bonusProjectUrls.forEach(url => {
					let bonusProjectUrl = new BonusProjectUrl();
					bonusProjectUrl.student = student;
					bonusProjectUrl.bonusProjectUrl = url;
					bonusProjectUrl.save();
				});
			}
			await PortfolioUrl.remove(student.portfolioUrls);
			if (updateStudentDto.portfolioUrls) {
				await PortfolioUrl.remove(student.portfolioUrls);
				await updateStudentDto.portfolioUrls.forEach(url => {
					let portfolioUrl = new PortfolioUrl();
					portfolioUrl.student = student;
					portfolioUrl.portfolioUrl = url;
					portfolioUrl.save();
				});
			}
			return `Entity id: ${id} updated.`;
		} catch (e) {
			return e;
		}
	}
}

