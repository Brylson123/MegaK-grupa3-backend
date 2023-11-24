import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
	async findOne(id: string) {
		return await UserEntity.findOne({ where: { id: id } });
	}

	async addUser(newUser: CreateUserDto): Promise<UserEntity> {
		const user = new UserEntity();
		user.email = newUser.email;
		await user.save();
		return user;
	}
}
