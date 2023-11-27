import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entity/user.entity";

@Controller("user")
export class UserController {
	constructor(@Inject(UserService) private userService: UserService) {}

	@Get("/:id")
	findOne(@Param("id") id: string): Promise<UserEntity> {
		return this.userService.findOne(id);
	}

	@Post("/register")
	createUser(@Body() newUser: CreateUserDto) {
		return this.userService.createUser(newUser);
	}
}
