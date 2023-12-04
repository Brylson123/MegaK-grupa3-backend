import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import {
	ExpectedContractType,
	ExpectedTypeWork,
	StudentInterface,
	StudentStatus,
} from "../../types";
import { PortfolioUrl } from "./portfolioUrl.entity";
import { ProjectUrl } from "./projectUrl.entity";
import { BonusProjectUrl } from "./bonusProjectUrls.entity";
import { HrStudentEntity } from "../../hr/entities/hr.student.entity";
import { UserEntity } from "../../user/entity/user.entity";

@Entity()
export class StudentEntity extends BaseEntity implements StudentInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		unique: true,
		nullable: true,
	})
	tel: string;

	@Column({
		type: "varchar",
		nullable: false,
	})
	firstName: string;

	@Column({
		type: "varchar",
		nullable: false,
	})
	lastName: string;

	@Column({
		type: "tinyint",
		nullable: true,
	})
	courseCompletion: number;

	@Column({
		type: "tinyint",
		nullable: true,
	})
	courseEngagement: number;

	@Column({
		type: "tinyint",
		nullable: true,
	})
	projectDegree: number;

	@Column({
		type: "tinyint",
		nullable: true,
	})
	teamProjectDegree: number;

	@Column({
		type: "varchar",
		nullable: true,
		default: null,
	})
	gitHubUserName: string;

	@Column({
		type: "varchar",
		nullable: true,
	})
	bio: string;

	@Column({
		type: "varchar",
		default: ExpectedTypeWork.NOT_IMPORTANT,
	})
	expectedTypeWork: ExpectedTypeWork;

	@Column({
		type: "varchar",
		nullable: true,
	})
	targetWorkCity: string;

	@Column({
		type: "varchar",
		default: ExpectedContractType.NOT_IMPORTANT,
	})
	expectedContractType: ExpectedContractType;

	@Column({
		type: "varchar",
		default: "0",
	})
	expectedSalary: string;

	@Column({
		type: "varchar",
		default: "nie",
	})
	canTakeApprenticeship: string;

	@Column({
		type: "tinyint",
		default: 0,
	})
	monthsOfCommercialExp: number;

	@Column({
		type: "text",
		nullable: true,
	})
	education: string;

	@Column({
		type: "text",
		nullable: true,
	})
	workExperience: string;

	@Column({
		type: "text",
		nullable: true,
	})
	courses: string;

	@Column({
		type: "tinyint",
		default: 0,
	})
	status: StudentStatus;

	@OneToMany(() => PortfolioUrl, (portfolioUrl) => portfolioUrl.student, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	portfolioUrls: PortfolioUrl[];

	@OneToMany(() => ProjectUrl, (projectUrl) => projectUrl.student, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	projectUrls: ProjectUrl[];

	@OneToMany(() => BonusProjectUrl, (bonusProjectUrl) => bonusProjectUrl.student, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	bonusProjectUrls: BonusProjectUrl[];

	@OneToMany(() => HrStudentEntity, (entity) => entity.student, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	hrs: HrStudentEntity[];

	@OneToOne(() => UserEntity, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	user: UserEntity;
}
