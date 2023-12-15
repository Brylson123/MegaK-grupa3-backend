import { IsString, IsUUID } from "class-validator";

export class ChangePwdDto {
	@IsUUID()
	userId: string;

	@IsString()
	oldPwd: string;

	@IsString()
	newPwd: string;
}