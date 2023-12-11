import { ActivateUserDto } from "../../user/dto/activate-user.dto";

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

export type ActivateUserRequest = ActivateUserDto;
