import { Body, Controller, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entity/user.entity";
import {
	ActivateUserRequest,
	ActivateUserResponse,
	ChangePwdResponse,
	FinOneUserResponse,
	RecoverPasswordRequest,
	RecoverPasswordResponse,
} from "../types";
import { ChangePwdDto } from "./dto/change-password.dto";

@Controller("user")
export class UserController {
	constructor(@Inject(UserService) private userService: UserService) {}

	@Get("/:id")
	findOne(@Param("id") id: string): Promise<FinOneUserResponse> {
		return this.userService.findOne(id);
	}

	@Post("/register")
	createUser(@Body() newUser: CreateUserDto) {
		return this.userService.createUser(newUser);
	}

	@Patch("/activate")
	activeUser(@Body() active: ActivateUserRequest): Promise<ActivateUserResponse> {
		return this.userService.activate(active);
	}

	@Patch("/changePwd")
	async changePwd(@Body() data: ChangePwdDto): Promise<ChangePwdResponse> {
		return this.userService.changePwd(data); 
	}

	@Post("/recover")
	recoverPassword(@Body() recover: RecoverPasswordRequest): Promise<RecoverPasswordResponse> {
		return this.userService.recover(recover);
	}
}
