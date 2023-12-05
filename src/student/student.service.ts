import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateStudentDto } from "./dto/createStudentDto";
import { StudentEntity } from "./entities/student.entity";
import { BonusProjectUrl } from "./entities/bonusProjectUrls.entity";
import { ProjectUrl } from "./entities/projectUrl.entity";
import { PortfolioUrl } from "./entities/portfolioUrl.entity";
import { ActiveStudentsDto } from "./dto/active-studnets.dto";
import { config } from "../config/config-database";
import {
	AdminInsertStudent,
	DisinterestStudentResponse,
	HrToStudentInterface,
	ReservationStudentResponse,
	StudentInterface,
	StudentsAvaibleViewInterface,
	StudentStatus,
	StudentsToInterviewInterface,
	StudentsToInterviewResponse,
	UserRole,
	viewAllActiveStudentsResponse,
} from "../types";
import { HttpService } from "@nestjs/axios";
import { HrStudentEntity } from "../hr/entities/hr.student.entity";
import { UserEntity } from "../user/entity/user.entity";
import { ReservationStudentDto } from "./dto/reservation-student.dto";
import { DisinterestStudentDto } from "./dto/disinterest-student.dto";
import { ValidateCreateStudent } from "../utils/validateCreateStudent";


@Injectable()
export class StudentService {
	constructor(
		private httpService: HttpService,
		private validateCreateStudent: ValidateCreateStudent,
	) {}

	private filterAvaibleStudents = (student: StudentInterface[]): StudentsAvaibleViewInterface[] => {
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
	private filterStudentsToInterview = (
		students: HrToStudentInterface[],
	): StudentsToInterviewInterface[] => {
		return students.map((student) => {
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
			} = student.student;
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
				reservationTo: student.reservationTo,
			};
		});
	};
	private async findGithubAvatar(name) {
		try {
			const github = await this.httpService.axiosRef.get(`https://api.github.com/users/${name}`);
			return {
				message: github.data.avatar_url || "",
				isSuccess: true,
			};
		} catch (e) {
			return {
				isSuccess: false,
				message: "Nie znaleziono avatara na github.",
			};
		}
	}

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

	async findAllToInterview(
		req: ActiveStudentsDto,
		user: UserEntity,
	): Promise<StudentsToInterviewResponse> {
		const hrUser = await UserEntity.findOne({
			where: {
				email: user.email,
			},
			relations: ["student", "hr"],
		});

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
			const expectedSalaryMax =
				req.expectedSalaryMax.length === 0 ? "99999999" : req.expectedSalaryMax;

			const [students, count] = await config
				.getRepository(HrStudentEntity)
				.createQueryBuilder("hrStudentEntity")
				.leftJoinAndSelect("hrStudentEntity.student", "studentId")
				.where(
					'hrId = :hrId AND courseCompletion >= :courseCompletion AND courseEngagement >= :courseEngagement AND projectDegree >= :projectDegree AND teamProjectDegree >= :teamProjectDegree AND (canTakeApprenticeship = :canTakeApprenticeship OR canTakeApprenticeship = "Tak") AND monthsOfCommercialExp >= :monthsOfCommercialExp AND (expectedSalary BETWEEN :expectedSalaryMin AND :expectedSalaryMax OR expectedSalary IS null)',
					{
						hrId: hrUser.hr.id,
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
						? "hrId = :hr"
						: '(expectedContractType IN (:expectedContractType) OR expectedContractType = "Bez znaczenia")',
					{
						hr: hrUser.hr.id,
						expectedContractType,
					},
				)
				.andWhere(
					!expectedTypeWork[0]
						? "hrId = :hr"
						: '(expectedTypeWork IN (:expectedTypeWork) OR expectedTypeWork = "Bez znaczenia" )',
					{
						hr: hrUser.hr.id,
						expectedTypeWork,
					},
				)
				.andWhere(
					searchTerm.length === 0
						? "hrId = :hr "
						: '(MATCH(targetWorkCity) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedTypeWork) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(expectedContractType) AGAINST (":searchTerm*" IN BOOLEAN MODE)OR MATCH(firstName) AGAINST (":searchTerm*" IN BOOLEAN MODE) OR MATCH(lastName) AGAINST (":searchTerm*" IN BOOLEAN MODE))',
					{
						hr: hrUser.hr.id,
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
				studentsCount: count,
				students: this.filterStudentsToInterview(students),
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

	async findOneStudent(id: string) {
		try {
			const student = await StudentEntity.findOne({
				where: { id: id },
				relations: {
					projectUrls: true,
					portfolioUrls: true,
				},
			});

			const {
				courseCompletion,
				courseEngagement,
				projectDegree,
				teamProjectDegree,
				status,
				...restOfStudent
			} = student;

			const { user } = await StudentEntity.findOne({
				where: { id: id },
				relations: {
					user: true,
				},
			});
			return {
				...restOfStudent,
				email: user.email,
			};
		} catch (e) {
			return {
				isSuccess: false,
				error: e.message,
			};
		}
	}

	async createStudent(createStudentDto: AdminInsertStudent) {
		try {
			const validatedCreateStudentDto =
				await this.validateCreateStudent.validateData(createStudentDto);
			const checkUser = await UserEntity.findOne({
				where: { email: validatedCreateStudentDto.email },
			});
			if (checkUser) {
				console.log("taki użytkownik istenieje");
			}

			const user = new UserEntity();

			try {
				user.email = validatedCreateStudentDto.email;
				user.role = UserRole.STUDENT;
				user.activeTokenId = validatedCreateStudentDto.token;
				await user.save();
			} catch (e) {
				return {
					error: e.message,
				};
			}
			const student = new StudentEntity();
			student.user = user;
			student.courseCompletion = validatedCreateStudentDto.courseCompletion;
			student.courseEngagement = validatedCreateStudentDto.courseEngagement;
			student.projectDegree = validatedCreateStudentDto.projectDegree;
			student.teamProjectDegree = validatedCreateStudentDto.teamProjectDegree;
			await student.save();
			user.student = student;
			await user.save();
			if (!!validatedCreateStudentDto.bonusProjectUrls) {
				for (const url of validatedCreateStudentDto.bonusProjectUrls) {
					const bonusProjectUrl = new BonusProjectUrl();
					bonusProjectUrl.student = student;
					bonusProjectUrl.bonusProjectUrl = url;
					await bonusProjectUrl.save();
				}
			}
			return {
				isSuccess: true,
				studentId: student.id,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	}

	async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
		const student = await StudentEntity.findOne({
			where: { id: id },
			relations: ["projectUrls", "portfolioUrls", "bonusProjectUrls", "user", "hrs"],
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
			if (!!updateStudentDto.gitHubUserName) {
				const { isSuccess, message } = await this.findGithubAvatar(updateStudentDto.gitHubUserName);
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
			student.user.email = updateStudentDto.email;

			if (!!updateStudentDto.projectUrls) {
				await ProjectUrl.remove(student.projectUrls);
				updateStudentDto.projectUrls.forEach((url) => {
					const projectUrl = new ProjectUrl();
					projectUrl.student = student;
					projectUrl.projectUrl = url;
					projectUrl.save();
				});
			}
			if (!!updateStudentDto.portfolioUrls) {
				await PortfolioUrl.remove(student.portfolioUrls);
				updateStudentDto.portfolioUrls.forEach((url) => {
					const portfolioUrl = new PortfolioUrl();
					portfolioUrl.student = student;
					portfolioUrl.portfolioUrl = url;
					portfolioUrl.save();
				});
			}

			await student.save();
			return {
				isSuccess: true,
				message: `Student with id: ${id} has been updated.`,
				email: student.user.email,
			};
		} catch (e) {
			return {
				isSuccess: false,
				error: e.message,
			};
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

	async reservation(
		{ studentId }: ReservationStudentDto,
		user: UserEntity,
	): Promise<ReservationStudentResponse> {
		const { hr } = user;
		if (hr.studentInterview.some((el) => el.studentId === studentId)) {
			throw new BadRequestException('Student już jest dodany w "Do Rozmowy".');
		}
		const student = await this.findOne(studentId);
		const active = student.user.active;
		const { status } = student;
		const { maxReservationStudent } = hr;
		if (maxReservationStudent <= hr.studentInterview.length) {
			throw new BadRequestException('Nie możesz dodać więcej kursantów "Do Rozmowy.');
		}
		if (active === false || status !== StudentStatus.ACCESSIBLE) {
			throw new BadRequestException("Kursant jest niedostępny.");
		}
		try {
			const hrToStudent = new HrStudentEntity();
			hrToStudent.hr = hr;
			hrToStudent.student = student;
			hrToStudent.reservationTo = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
			await hrToStudent.save();
			return {
				message: 'Dodano kursanta "Do rozmowy"',
				isSuccess: true,
			};
		} catch (e) {
			throw new BadRequestException('Nie udało się dodać kursanta "Do rozmowy"');
		}
	}

	async disinterest({ studentId }: DisinterestStudentDto): Promise<DisinterestStudentResponse> {
		const student = await this.findOne(studentId);

		if (!student) {
			return {
				isSuccess: false,
				message: "Nie znaleziono takiego kursanta.",
			};
		}

		const { affected } = await StudentEntity.update(
			{ id: student.id, status: StudentStatus.PENDING },
			{ status: StudentStatus.ACCESSIBLE },
		);

		if (affected === 0) {
			return { isSuccess: false };
		} else {
			return { isSuccess: true };
		}
	}
}
