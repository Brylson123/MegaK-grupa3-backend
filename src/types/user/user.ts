import { ActivateUserDto } from "../../user/dto/activate-user.dto";
import { RecoverPasswordDto } from "../../user/dto/recover-password.dto";
import { HrInterface } from "../hr";
import { StudentInterface } from "../student";

export interface UserInterface {
	id: string;
	email: string;
	pwdHash: string;
	salt: string;
	currentTokenId: string | null;
	activeTokenId: string | null;
	active: boolean;
	role: UserRole;
}

export enum UserRole {
	ADMIN,
	STUDENT,
	HR,
}

export type ActivateUserResponse = {
	message: string;
	isSuccess: boolean;
};

export type RecoverPasswordResponse = {
	isSuccess: boolean;
};

export type ActivateUserRequest = ActivateUserDto;
export type RecoverPasswordRequest = RecoverPasswordDto;

export type FinOneUserResponse = {
		id: string;
		email: string;
		active: boolean;
		role: UserRole;
		student: StudentInterface;
		hr: HrInterface;
}
