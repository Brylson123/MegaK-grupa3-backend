import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { ActivateUserResponse } from "../types";
import { hashPwd, randomSalt } from "../utils/hash-pwd";

@Injectable()
export class UserService {
	async findOne(id: string) {
		return await UserEntity.findOne({
			where: { id: id },
			relations: {
				student: true,
				hr: true,
			},
		});
	}

	async createUser(newUser: CreateUserDto): Promise<UserEntity> {
		const user = new UserEntity();
		user.email = newUser.email;
		user.pwdHash = newUser.pwdHash;
		user.salt = newUser.salt;
		user.currentTokenId = newUser.currentTokenId;
		user.activeTokenId = newUser.activeTokenId;
		user.active = newUser.active;
		user.role = newUser.role;
		await user.save();
		return user;
	}

	async activate(active: ActivateUserDto): Promise<ActivateUserResponse> {
		const { userId, token, password } = active;
		const user = await UserEntity.findOne({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new BadRequestException("Nie znaleziono użytkownika.");
		}

		if (user.active) {
			throw new BadRequestException("Użytkownik jest już aktywny.");
		}

		if (user.activeTokenId !== token) {
			throw new BadRequestException(
				"Podany link aktywacyjny jest nieaktywny. Proszę się skontaktować z administratorem.",
			);
		}

		const salt = randomSalt(128);
		user.pwdHash = hashPwd(password, salt);
		user.salt = salt;
		user.active = true;
		user.activeTokenId = null;
		await user.save();

		return {
			message: "Użytkownik został aktywowany",
			isSuccess: true,
		};
	}
}
