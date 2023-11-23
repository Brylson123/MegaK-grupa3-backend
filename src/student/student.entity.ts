import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateStudentDto } from "./dto/createStudentDto";

@Entity()
export class Student extends BaseEntity implements CreateStudentDto {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "text",
		unique: true,
		nullable: false,
	})
	email: string;

	@Column({
		type: "text",
		unique: true,
		nullable: true,
	})
	tel: string;

	@Column({
		type: "text",
		nullable: false,
	})
	firstName: string;

	@Column({
		type: "text",
		nullable: false,
	})
	lastName: string;

	@Column({
		type: "text",
		nullable: false,
	})
	@Column({
		type: "text",
		nullable: true,
	})
	gitHubUserName: string;

	@Column({
		type: "simple-array",
		nullable: true,
	})
	portfolioUrls: string[];

	@Column({
		type: "simple-array",
		nullable: true,
	})
	projectUrls: string[];

	@Column({
		type: "text",
		nullable: false,
	})
	bio: string;

	@Column({
		type: "text",
		nullable: false,
	})
	expectedTypeWork: string;

	@Column({
		type: "text",
		nullable: true,
	})
	targetWorkCity: string;

	@Column({
		type: "text",
		nullable: true,
	})
	expectedContractType: string;

	@Column({
		type: "text",
		default: "0",
	})
	expectedSalary: string;

	@Column({
		type: "text",
		default: "nie",
	})
	canTakeApprenticeship: string;

	@Column({
		type: "int",
		default: 0,
	})
	monthsOfCommercialExp: number;

	@Column({
		type: "longtext",
		nullable: true,
	})
	education: string;

	@Column({
		type: "longtext",
		nullable: true,
	})
	workExperience: string;

	@Column({
		type: "longtext",
		nullable: true,
	})
	courses: string;
}
