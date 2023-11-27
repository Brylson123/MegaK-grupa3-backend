import { UserInterface } from "../user";
import { StudentInterface } from "../student";

export interface HrInterface {
	id: string;
	fullName: string;
	company: string;
	maxReservationStudent: number;
	studentInterview: HrToStudentInterface[];
	user: UserInterface;
}

export interface HrToStudentInterface {
	id: string;
	studentId: string;
	hrId: string;
	student: StudentInterface;
	hr: HrInterface;
	reservationTo: Date;
}
