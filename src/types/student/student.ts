export interface StudentInterface {
	id: string;
	tel?: string | null;
	firstName: string;
	lastName: string;
	courseCompletion: number;
	courseEngagement: number;
	projectDegree: number;
	teamProjectDegree: number;
	gitHubUserName: string;
	bio?: string;
	expectedTypeWork: ExpectedTypeWork;
	targetWorkCity?: string;
	expectedContractType: ExpectedContractType;
	expectedSalary?: string;
	canTakeApprenticeship: string;
	monthsOfCommercialExp: number;
	education?: string | null;
	workExperience: string | null;
	courses?: string | null;
	status: string;
}

export interface StudentAvaibleViewInterface {
	studentId: string;
	firstName: string;
	lastName: string;
	courseCompletion: number;
	courseEngagement: number;
	projectDegree: number;
	teamProjectDegree: number;
	expectedTypeWork: ExpectedTypeWork;
	targetWorkCity?: string;
	expectedContractType: ExpectedContractType;
	expectedSalary?: string;
	canTakeApprenticeship: string;
	monthsOfCommercialExp: number;
}
export enum StudentStatus {
	ACCESSIBLE,
	PENDING,
	EMPLOYED,
}

export type viewAllActiveStudentsResponse = {
	isSuccess: boolean;
	pageCount: number;
	students: StudentAvaibleViewInterface[];
	studentsCount: number;
};
export enum ExpectedTypeWork {
	NOT_IMPORTANT = "Bez znaczenia",
	LOCAL = "Na miejscu",
	FLEXIBLE = "Gotowość do przeprowadzki",
	REMOTE = "Wyłącznie zdalnie",
	HYBRID = "Hybrydowo",
}

export enum ExpectedContractType {
	NOT_IMPORTANT = "Brak preferencji",
	UOP = "Tylko UoP",
	B2B = "Możliwe B2B",
	UZ_UOD = "Możliwe UZ/UoD",
}
