import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "../user/entity/user.entity";
import { Strategy } from "passport-jwt";

export interface JwtPayload {
	id: string;
}

function cookieExtractor(req: any): null | string {
	return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: cookieExtractor,
			secretOrKey:
				"ndojsanouidhw13q9uy1987ye129h97h92@##U@*!#&@(!udjhsadh(H@(Y#912iuhgdiwuyghwew712g81o8h9*HE(ODIHAD(&*H@EO!*BilIUH",
		});
	}

	async validate(payload: JwtPayload, done: (error, user) => void) {
		if (!payload || !payload.id) {
			return done(new UnauthorizedException(), false);
		}
		const user = await UserEntity.findOneBy({ currentTokenId: payload.id });
		if (!user) {
			return done(new UnauthorizedException(), false);
		}

		done(null, user);
	}
}
