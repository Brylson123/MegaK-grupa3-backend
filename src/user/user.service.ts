import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
	async findOne(id: string) {
		return await UserEntity.findOne({ where: { id: id } });
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
}
