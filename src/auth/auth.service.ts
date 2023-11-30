import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { hashPwd } from "../utils/hash-pwd";
import { Response } from "express";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";
import { JwtPayload } from "./jwt.strategy";
import { UserEntity } from "../user/entity/user.entity";

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

	async login(req: AuthLoginDto, res: Response): Promise<any> {
		try {
			const user = await UserEntity.findOneBy({
				email: req.email,
				pwdHash: hashPwd(req.pwd),
			});
			if (!user) {
				return res.json({ message: "login invalid" });
			}
			const token = await this.createToken(await this.generateToken(user));

			return res
				.cookie("jwt", token.accessToken, {
					secure: false,
					domain: "localhost",
					httpOnly: true,
				})
				.json({ ok: true, name: user.email });
		} catch (e) {
			return res.json({ error: e.message });
		}
	}

	async logout(user: UserEntity, res: Response): Promise<any> {
		try {
			user.currentTokenId = null;
			await user.save();
			res.clearCookie("jwt", {
				secure: false,
				domain: "localhost",
				httpOnly: true,
			});
			return res.json({ message: "logout" });
		} catch (e) {
			return res.json({ error: e.message });
		}
	}
}
