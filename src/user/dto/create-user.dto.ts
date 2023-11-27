import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "../../types";

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	pwdHash: string;

	@IsOptional()
	@IsString()
	currentTokenId: string | null;

	@IsOptional()
	@IsString()
	activeTokenId: string | null;

	@IsBoolean()
	active: boolean;

	@IsEnum(UserRole)
	role: UserRole;
}
