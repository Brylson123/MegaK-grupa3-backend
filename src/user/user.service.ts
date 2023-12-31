import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { ActivateUserResponse, ChangePwdResponse, RecoverPasswordResponse } from "../types";
import { hashPwd, randomSalt } from "../utils/hash-pwd";
import { MailService } from "../mail/mail.service";
import { studentRegistrationTemplate } from "../templates/email/student-registration.template";
import { RecoverPasswordDto } from "./dto/recover-password.dto";
import { generateRandomPassword } from "../utils/random-pwd";
import { ChangePwdDto } from "./dto/change-password.dto";

@Injectable()
export class UserService {
	constructor(@Inject(MailService) private readonly mailService: MailService) {}
	
	async findOne(id: string) {
		const user = await UserEntity.findOne({
			where: { id: id },
			relations: {
				student: true,
				hr: true,
			},
		});
		const {activeTokenId, currentTokenId, pwdHash, salt, ...restOfUser} = user;
		return restOfUser;
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
		await this.mailService.sendMail(
			user.email,
			"Rejestracja na MegaK HeadHunters",
			studentRegistrationTemplate(),
			);
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

	async recover(recover: RecoverPasswordDto): Promise<RecoverPasswordResponse> {
		const user = await UserEntity.findOne({
			where: {
				email: recover.email,
			},
		});

		if (!user) {
			return {
				isSuccess: false,
			};
		}

		const password = generateRandomPassword();
		user.pwdHash = hashPwd(password, user.salt);
		await user.save();
		
		await this.mailService.sendMail(
			recover.email,
			"odzyskiwanie hasła do konta:",
			`<p>Twoje nowe hasło to:${password}</p>`,
		);

		return {
			isSuccess: true,
		};
	}

async changePwd(data: ChangePwdDto): Promise<ChangePwdResponse> {
		try {
			const userToChangePwd = await UserEntity.findOne({ where: { id: data.userId } });
			const password = hashPwd(data.oldPwd, userToChangePwd.salt);
			if (userToChangePwd.pwdHash !== password) {
				return {
					isSuccess: false,
					message: "Niepoprawne dane logowania!",
				};
			}
			userToChangePwd.salt = randomSalt(128);
			userToChangePwd.pwdHash = hashPwd(data.newPwd, userToChangePwd.salt);
			userToChangePwd.save();
			return {
				isSuccess: true,
			};
		} catch (e) {
			return {
				isSuccess: false,
				message: e.message,
			};
		}
	}
}
