import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AuthLoginDto {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	pwd: string;
}
