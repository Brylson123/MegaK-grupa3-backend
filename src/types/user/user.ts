export interface UserInterface {
	id: string;
	email: string;
	pwdHash: string;
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
