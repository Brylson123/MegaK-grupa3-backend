import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExpectedContractType, ExpectedTypeWork, StudentInterface } from "../../types";
import { PortfolioUrl } from "./portfolioUrl.entity";
import { ProjectUrl } from "./projectUrl.entity";
import { BonusProjectUrl } from "./bonusProjectUrls.entity";

@Entity()
export class Student extends BaseEntity implements StudentInterface {
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
	courseCompletion: string;

	@Column({
		type: "tinyint",
		nullable: true,
	})
	courseEngagment: string;

	@Column({
		type: "tinyint",
		nullable: true,
	})
	projectDegree: string;

	@Column({
		type: "tinyint",
		nullable: true,
	})
	teamProjectDegree: string;

	@Column({
		type: "varchar",
		nullable: true,
	})
	gitHubUserName: string;

	@Column({
		type: "varchar",
		nullable: false,
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
		default: null,
	})
	expectedSalary: string;

	@Column({
		type: "varchar",
		default: null,
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
		type: "varchar",
		nullable: true,
	})
	status: string;

	@OneToMany(() => PortfolioUrl, (portfolioUrl) => portfolioUrl.student, {
		cascade: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
		createForeignKeyConstraints: true,
	})
	portfolioUrls: PortfolioUrl[];

	@OneToMany(() => ProjectUrl, (projectUrl) => projectUrl.student, {
		cascade: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
		createForeignKeyConstraints: true,
	})
	projectUrls: ProjectUrl[];

	@OneToMany(() => BonusProjectUrl, (bonusProjectUrl) => bonusProjectUrl.student, {
		cascade: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	bonusProjectUrls: BonusProjectUrl[];
}
