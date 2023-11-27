import { Controller, Post, Body, Res, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "../user/entity/user.entity";
import { UserObj } from "../decorators/user-obj.decorator";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/login")
	async login(@Body() req: AuthLoginDto, @Res() res: Response): Promise<any> {
		return this.authService.login(req, res);
	}
	@Get("logout")
	@UseGuards(AuthGuard("jwt"))
	async logout(@UserObj() user: UserEntity, @Res() res: Response) {
		return this.authService.logout(user, res);
	}
}
