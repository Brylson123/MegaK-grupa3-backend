import { Injectable } from "@nestjs/common";
import { hashPwd } from "../utils/hash-pwd";
import { Response } from "express";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";
import { JwtPayload } from "./jwt.strategy";
import { UserEntity } from "../user/entity/user.entity";
import { AuthLoginRequest} from "../types";
import { UserRole } from "../types";

@Injectable()
export class AuthService {
	public createToken(currentTokenId: string): {
		accessToken: string;
		expiresIn: number;
	} {
		const payload: JwtPayload = { id: currentTokenId };
		const expiresIn = 60 * 60 * 24;
		const accessToken = sign(
			payload,
			"ndojsanouidhw13q9uy1987ye129h97h92@##U@*!#&@(!udjhsadh(H@(Y#912iuhgdiwuyghwew712g81o8h9*HE(ODIHAD(&*H@EO!*BilIUH",
			{ expiresIn },
		);
		return {
			accessToken,
			expiresIn,
		};
	}
	private checkActiveUser = (user: UserEntity) => user.active === true;

	private getUserFullName = (user: UserEntity) => {
		if (user.role === UserRole.STUDENT) {
			return user.student?.firstName + user.student?.lastName;
		} else if (user.role === UserRole.HR) {
			return user.hr.fullName;
		} else {
			return "ADMIN";
		}
	};
	private async generateToken(user: UserEntity): Promise<string> {
		let token;
		let userWithThisToken = null;
		do {
			token = uuid();
			userWithThisToken = await UserEntity.findOneBy({ currentTokenId: token });
		} while (!!userWithThisToken);
		user.currentTokenId = token;
		await user.save();
		return token;
	}

	async login(req: AuthLoginRequest, res: Response) {
		try {
			if (!req.email.includes("@")) {
				return res.json({
					isSuccess: false,
					message: "Błędny e-mail.",
				});
			}

			if (req.pwd.length < 2) {
				return res.json({
					isSuccess: false,
					message: "Hasło nie może być mniejsze od dwóch znaków.",
				});
			}

			const user = await UserEntity.findOne({
				where: {
					email: req.email,
				},
				relations: ["student", "hr"],
			});

			if (!user) {
				return res.json({
					isSuccess: false,
					message: "Niepoprawne dane logowania!",
				});
			}

			const password = hashPwd(req.pwd, user.salt);
			if (user.pwdHash !== password) {
				return res.json({
					isSuccess: false,
					message: "Niepoprawne dane logowania!",
				});
			}

			if (!this.checkActiveUser(user) === true) {
				return res.json({
					isSuccess: false,
					message: "Użytkownik jest nieaktywny!",
				});
			}

			const token = this.createToken(await this.generateToken(user));

			return res
				.cookie("jwt", token.accessToken, {
					secure: true,
					domain: "radek.smallhost.pl",
					httpOnly: true,
					sameSite: 'none',
					maxAge: 900000,
				})
				.json({
					isSuccess: true,
					userFullName: this.getUserFullName(user),
					userId: user.id,
					userRole: user.role,
				});
		} catch (e) {
			return res.json({
				isSuccess: false,
				message: e.message,
			});
		}
	}

	async logout(user: UserEntity, res: Response): Promise<any> {
		console.log(user);
		try {
			user.currentTokenId = null;
			await user.save();
			res.clearCookie("jwt", {
				secure: true,
				domain: "radek.smallhost.pl",
				httpOnly: true,
				sameSite: 'none',
			});
			return res.json({ message: "logout" });
		} catch (e) {
			return res.json({ error: e.message });
		}
	}
}
