import { Body, Controller, Inject, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
	constructor(@Inject(UserService) private userService: UserService) {}

	@Post("/register")
	addUser(@Body() newUser: CreateUserDto) {
		return this.userService.addUser(newUser);
	}
}
