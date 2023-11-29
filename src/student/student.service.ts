import { Injectable } from "@nestjs/common";
import { CreateStudentDto, UpdateStudentDto } from "./dto/createStudentDto";
import { StudentEntity } from "./entities/student.entity";
import { BonusProjectUrl } from "./entities/bonusProjectUrls.entity";
import { ProjectUrl } from "./entities/projectUrl.entity";
import { PortfolioUrl } from "./entities/portfolioUrl.entity";
import { ActiveStudentsDto } from "./dto/active-studnets.dto";
import { config } from "../config/config-database";
import {
	StudentAvaibleViewInterface,
	StudentInterface,
	StudentStatus,
	viewAllActiveStudentsResponse,
} from "../types";

@Injectable()
export class StudentService {
	private filterAvaibleStudents = (student: StudentInterface[]): StudentAvaibleViewInterface[] => {
		return student.map((student) => {
			const {
				id: studentId,
				firstName,
				lastName,
				courseCompletion,
				courseEngagement,
				projectDegree,
				teamProjectDegree,
				expectedTypeWork,
				targetWorkCity,
				expectedContractType,
				expectedSalary,
				canTakeApprenticeship,
				monthsOfCommercialExp,
			} = student;
			return {
				studentId,
				firstName,
				lastName,
				courseCompletion,
				courseEngagement,
				projectDegree,
				teamProjectDegree,
				expectedTypeWork,
				targetWorkCity,
				expectedContractType,
				expectedSalary,
				canTakeApprenticeship,
				monthsOfCommercialExp,
			};
		});
	};

	async viewAllActiveStudents(req: ActiveStudentsDto): Promise<viewAllActiveStudentsResponse> {
		try {
			const {
				pageSize,
				currentPage,
				courseCompletion,
				courseEngagement,
				projectDegree,
				teamProjectDegree,
				expectedTypeWork,
				expectedContractType,
				canTakeApprenticeship,
				monthsOfCommercialExp,
			} = req;

			const searchTerm = req.search;
			const expectedSalaryMin = req.expectedSalaryMin.length === 0 ? "0" : req.expectedSalaryMin;
			const expectedSalaryMax = req.expectedSalaryMax.length === 0 ? "0" : req.expectedSalaryMin;

			const [students, count] = await config
				.getRepository(StudentEntity)
				.createQueryBuilder()
				.where(
					'courseCompletion >= :courseCompletion AND courseEngagement >= :courseEngagement AND projectDegree >= :projectDegree AND teamProjectDegree >= :teamProjectDegree AND (canTakeApprenticeship = :canTakeApprenticeship OR canTakeApprenticeship = "Tak") AND monthsOfCommercialExp >= :monthsOfCommercialExp AND (expectedSalary BETWEEN :expectedSalaryMin AND :expectedSalaryMax OR expectedSalary IS null )',
					{
						courseCompletion,
						courseEngagement,
						projectDegree,
						teamProjectDegree,
						canTakeApprenticeship,
						monthsOfCommercialExp,
						expectedSalaryMin,
						expectedSalaryMax,
					},
				)
				.andWhere(
					!expectedContractType[0]
						? "status = :status"
						: '(expectedContractType IN (:expectedContractType) OR expectedContractType = "Bez znaczenia")',
					{
						expectedContractType,
					},
				)
				.andWhere(
					!expectedTypeWork[0]
						? "status = :status"
						: '(expectedTypeWork IN (:expectedTypeWork) OR expectedTypeWork = "Bez znaczenia")',
					{
						status: StudentStatus.ACCESSIBLE,
						expectedTypeWork,
					},
				)
				.andWhere(
					searchTerm.length === 0
						? "status = :status"
						: '(MATCH(targetWorkCity) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedTypeWork) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedContractType) AGAINST (":searchTerm*" IN BOOLEAN MODE))',
					{
						status: StudentStatus.ACCESSIBLE,
						searchTerm,
					},
				)
				.skip(pageSize * (currentPage - 1))
				.take(pageSize)
				.getManyAndCount();
			const pageCount = Math.ceil(count / pageSize);
			return {
				isSuccess: true,
				pageCount,
				students: this.filterAvaibleStudents(students),
				studentsCount: count,
			};
		} catch (e) {
			throw new Error(e.message);
		}
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
		``;
		try {
			student.bio = createStudentDto.bio;
			student.canTakeApprenticeship = createStudentDto.canTakeApprenticeship;
			student.courseCompletion = createStudentDto.courseCompletion;
			student.courseEngagement = createStudentDto.courseEngagement;
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

			if (!!createStudentDto.bonusProjectUrls) {
				for (const url of createStudentDto.bonusProjectUrls) {
					const bonusProjectUrl = new BonusProjectUrl();
					bonusProjectUrl.student = student;
					bonusProjectUrl.bonusProjectUrl = url;
					await bonusProjectUrl.save();
					console.log("podano url");
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
			student.courseEngagement = updateStudentDto.courseEngagement;
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
