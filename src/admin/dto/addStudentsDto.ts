import { IsArray, IsEmail, IsInt, Max, Min } from "class-validator";
import { BonusProjectUrl } from "src/student/entities/bonusProjectUrls.entity";

export class AddStudentsDto {
    @IsEmail()
    email: string;
    
    @IsInt()
    @Min(0)
    @Max(5)
    courseCompletion: number;

    @IsInt()
    @Min(0)
    @Max(5)
    courseEngagment: number;

    @IsInt()
    @Min(0)
    @Max(5)
    projectDegree: number;

    @IsInt()
    @Min(0)
    @Max(5)
    teamProjectDegree: number;

    @IsArray()
    bonusProjectUrls: BonusProjectUrl[];
}