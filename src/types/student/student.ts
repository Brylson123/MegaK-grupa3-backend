import { PortfolioUrl } from "src/student/portfolioUrl.entity";
import { ProjectUrl } from "src/student/projectUrl.entity";

export interface StudentInterface {
    email: string;
    tel: string | null;
    firstName: string;
    lastName: string;
	courseCompletion: string;
	courseEngagment: string;
	projectDegree: string;
	teamProjectDegree: string;
    gitHubUserName: string;
    portfolioUrl: PortfolioUrl;
    projectUrl: ProjectUrl;
    bio: string;
    expectedTypeWork: ExpectedTypeWork;
    targetWorkCity: string;
    expectedContractType: string;
    expectedSalary: string;
    canTakeApprenticeship: string;
    monthsOfCommercialExp: number;
    education: string | null;
    workExperience: string | null;
    courses: string | null;
    status: string;
}

export enum ExpectedTypeWork {
    NOT_IMPORTANT = 'Bez znaczenia',
    LOCAL = 'Na miejscu',
    FLEXIBLE = 'Gotowość do przeprowadzki',
    REMOTE = 'Wyłącznie zdalnie',
    HYBRID = 'Hybrydowo',
}

export enum ExpectedContractType {
    NOT_IMPORTANT = 'Brak preferencji',
    UOP = 'Tylko UoP',
    B2B = 'Możliwe B2B',
    UZ_UOD = 'Możliwe UZ/UoD',
}