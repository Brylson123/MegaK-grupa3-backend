import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, IsUrl, isEnum } from "class-validator";
import { ExpectedContractType, ExpectedTypeWork } from "../../types";
import { PortfolioUrl } from "../portfolioUrl.entity";
import { ProjectUrl } from "../projectUrl.entity";

export class CreateStudentDto {
    @IsEmail()
    email: string;

    @IsNumberString()
    tel: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
	courseCompletion: string;

	@IsString()
	courseEngagment: string;

	@IsString()
	projectDegree: string;

	@IsString()
	teamProjectDegree: string;

    @IsString()
    gitHubUserName: string;
    //TODO check if this is correct gitHubUserName

    @IsOptional()
    @IsUrl()
    portfolioUrls: PortfolioUrl;
    //TODO check if this is URL

    @IsOptional()
    @IsUrl()
    projectUrls: ProjectUrl;

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
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}