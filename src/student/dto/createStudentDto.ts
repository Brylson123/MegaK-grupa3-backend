import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsBoolean, IsEmail, IsNumber, IsNumberString, IsString } from "class-validator";

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
    gitHubUserName: string;
    //TODO check if this is correct gitHubUserName

    @IsArray()
    portfolioUrls: string[];
    //TODO check if this is URL

    @IsArray()
    projectUrls: string[];

    @IsString()
    bio: string;

    @IsString()
    expectedTypeWork: string;

    @IsString()
    targetWorkCity: string;

    @IsString()
    expectedContractType: string;

    @IsString()
    expectedSalary: string;

    @IsString()
    canTakeApprenticeship: string;

    @IsNumber()
    monthsOfCommercialExp: number;

    @IsString()
    education: string;

    @IsString()
    workExperience: string;

    @IsString()
    courses: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}