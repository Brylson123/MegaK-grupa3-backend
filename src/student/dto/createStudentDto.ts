import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsInt, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator";
import { ExpectedContractType, ExpectedTypeWork } from "../../types";
import { BonusProjectUrl } from "../entities/bonusProjectUrls.entity";

export class CreateStudentDto {
	@IsEmail()
	email: string;

	@IsOptional()
	@IsInt()
    @Min(0)
    @Max(5)
	courseCompletion: number;

	@IsOptional()
	@IsInt()
    @Min(0)
    @Max(5)
	courseEngagement: number;

	@IsOptional()
	@IsInt()
    @Min(0)
    @Max(5)
	projectDegree: number;

	@IsOptional()
	@IsInt()
    @Min(0)
    @Max(5)
	teamProjectDegree: number;

	@IsOptional()
	// @IsUrl()
	bonusProjectUrls: string[];
}

export class UpdateStudentDto {
	@IsEmail()
	email: string;

	@IsOptional()
	@IsNumberString()
	tel: string;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsOptional()
	@IsString()
	courseCompletion: number;

	@IsOptional()
	@IsString()
	courseEngagement: number;

	@IsOptional()
	@IsString()
	projectDegree: number;

	@IsOptional()
	@IsString()
	teamProjectDegree: number;

	@IsOptional()
	@IsString()
	gitHubUserName: string;

	@IsOptional()
	@IsString()
	bio: string;

	@IsOptional()
	@IsEnum(ExpectedTypeWork)
	expectedTypeWork: ExpectedTypeWork;

	@IsOptional()
	@IsString()
	targetWorkCity: string;

	@IsOptional()
	@IsEnum(ExpectedContractType)
	expectedContractType: ExpectedContractType;

	@IsOptional()
	@IsString()
	expectedSalary: string;

	@IsOptional()
	@IsString()
	canTakeApprenticeship: string;

	@IsOptional()
	@IsNumber()
	monthsOfCommercialExp: number;

	@IsOptional()
	@IsString()
	education: string;

	@IsOptional()
	@IsString()
	workExperience: string;

	@IsOptional()
	@IsString()
	courses: string;

	@IsOptional()
	@IsString()
	status: StudentStatus;

	@IsOptional()
	// @IsUrl()
	portfolioUrls: string[];

	@IsOptional()
	// @IsUrl()
	projectUrls: string[];

	@IsOptional()
	// @IsUrl()
	bonusProjectUrls: string[];
}
