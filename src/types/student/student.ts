import { HrToStudentInterface } from "../hr";
import { UserInterface } from "../user";

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
	status: StudentStatus;
	user: UserInterface;
	hrs: HrToStudentInterface[];
}

export interface StudentsAvaibleViewInterface {
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

export type AdminInsertStudent = {
	token: string;
	email: string;
	courseCompletion: number;
	courseEngagement: number;
	projectDegree: number;
	teamProjectDegree: number;
	bonusProjectUrls: string[];
};

export enum StudentStatus {
	ACCESSIBLE,
	PENDING,
	EMPLOYED,
}

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

export type viewAllActiveStudentsResponse = {
	isSuccess: boolean;
	pageCount: number;
	students: StudentsAvaibleViewInterface[];
	studentsCount: number;
};
export interface StudentsToInterviewInterface extends StudentsAvaibleViewInterface {
	reservationTo: Date;
}

export type StudentsToInterviewResponse = {
	isSuccess: boolean;
	pageCount: number;
	students: StudentsToInterviewInterface[];
	studentsCount: number;
};

export type ReservationStudentResponse = {
	isSuccess: boolean;
	message: string;
};

export type DisinterestStudentResponse =
	| {
			isSuccess: false;
			message: string;
	  }
	| {
			isSuccess: boolean;
	  };

export type StudentResponse = {
	id?: string;
	tel?: string | null;
	firstName?: string;
	lastName?: string;
	bio?: string;
	expectedTypeWork?: ExpectedTypeWork;
	targetWorkCity?: string;
	expectedContractType?: ExpectedContractType;
	expectedSalary?: string;
	canTakeApprenticeship?: string;
	monthsOfCommercialExp?: number;
	education?: string | null;
	workExperience?: string | null;
	courses?: string | null;
	email?: string;
	isSuccess?: boolean;
	error?: Error;
};

export type HiredStudentResponse =
	| {
			isSuccess: false;
			message: string;
	  }
	| {
			isSuccess: boolean;
	  };
