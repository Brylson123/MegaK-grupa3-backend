import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { ExpectedContractType, ExpectedTypeWork } from "../../types";

export class CreateStudentDto {
	id: string;

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
	//TODO check if this is correct gitHubUserName
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
	status: string;

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

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
