import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UserService {
	constructor(
		@Inject(MailService) private mailService: MailService,
	) {
	}
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
		await this.mailService.sendMail(user.email, "Rejestracaj na MegaK HeadHanters", `Oto twój link aktywacyjny ${user.activeTokenId}`);
		return user;
	}
}
