import { Injectable } from "@nestjs/common";
import { CreateStudentDto, UpdateStudentDto } from "./dto/createStudentDto";
import { StudentEntity } from "./entities/student.entity";
import { BonusProjectUrl } from "./entities/bonusProjectUrls.entity";
import { ProjectUrl } from "./entities/projectUrl.entity";
import { PortfolioUrl } from "./entities/portfolioUrl.entity";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class StudentService {
	constructor(private readonly httpService: HttpService) {}

	async findGithubAvatar(name) {
        try {
            const github = await this.httpService.axiosRef.get(
                `https://api.github.com/users/${name}`,
            );
            return {
                message: github.data.avatar_url || '',
                isSuccess: true,
            };
        } catch (e) {
            return {
                isSuccess: false,
                message: 'Nie znaleziono avatara na github.',
            };
        }
    }

	async findAll() {
		return await StudentEntity.find({
			relations: {
				projectUrls: true,
				bonusProjectUrls: true,
				portfolioUrls: true,
				hrs: true,
				user: true,
			},
		});
	}

	async findOne(id: string) {
		return await StudentEntity.findOne({
			where: { id: id },
			relations: {
				projectUrls: true,
				bonusProjectUrls: true,
				portfolioUrls: true,
				hrs: true,
				user: true,
			},
		});
	}

	async createStudent(createStudentDto: CreateStudentDto) {
		const student = new StudentEntity();
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
			if (!!createStudentDto.gitHubUserName) {
				const {isSuccess, message} = await this.findGithubAvatar(createStudentDto.gitHubUserName);
				if (isSuccess) {
					student.gitHubUserName = createStudentDto.gitHubUserName;
				} else {
					return message;
				}
			}
			student.lastName = createStudentDto.lastName;
			student.monthsOfCommercialExp = createStudentDto.monthsOfCommercialExp;
			student.projectDegree = createStudentDto.projectDegree;
			student.status = createStudentDto.status;
			student.targetWorkCity = createStudentDto.targetWorkCity;
			student.teamProjectDegree = createStudentDto.teamProjectDegree;
			student.tel = createStudentDto.tel;
			student.workExperience = createStudentDto.workExperience;
			await student.save();

			if (!!createStudentDto.bonusProjectUrls) {
				for (const url of createStudentDto.bonusProjectUrls) {
					const bonusProjectUrl = new BonusProjectUrl();
					bonusProjectUrl.student = student;
					bonusProjectUrl.bonusProjectUrl = url;
					await bonusProjectUrl.save();
				}
			}
			return student.id;
		} catch (e) {
			return e;
		}
	}

	async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
		const student = await StudentEntity.findOne({
			where: { id: id },
			relations: ["projectUrls", "portfolioUrls", "bonusProjectUrls"],
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
			if (!!updateStudentDto.gitHubUserName) {
				const {isSuccess, message} = await this.findGithubAvatar(updateStudentDto.gitHubUserName);
				if (isSuccess) {
					student.gitHubUserName = updateStudentDto.gitHubUserName;
				} else {
					return message;
				}
			}
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
				updateStudentDto.projectUrls.forEach((url) => {
					const projectUrl = new ProjectUrl();
					projectUrl.student = student;
					projectUrl.projectUrl = url;
					projectUrl.save();
				});
			}
			// await BonusProjectUrl.remove(student.bonusProjectUrls);
			// if (updateStudentDto.bonusProjectUrls) {
			// 	await BonusProjectUrl.remove(student.bonusProjectUrls);
			// 	updateStudentDto.bonusProjectUrls.forEach((url) => {
			// 		const bonusProjectUrl = new BonusProjectUrl();
			// 		bonusProjectUrl.student = student;
			// 		bonusProjectUrl.bonusProjectUrl = url;
			// 		bonusProjectUrl.save();
			// 	});
			// }
			await PortfolioUrl.remove(student.portfolioUrls);
			if (updateStudentDto.portfolioUrls) {
				await PortfolioUrl.remove(student.portfolioUrls);
				updateStudentDto.portfolioUrls.forEach((url) => {
					const portfolioUrl = new PortfolioUrl();
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

	async deleteStudent(id: string) {
		try {
			await StudentEntity.delete(id);
			return `Student id: ${id} has been deleted.`;
		} catch (e) {
			return e;
		}
	}
}
