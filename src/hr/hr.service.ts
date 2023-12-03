import { Injectable } from "@nestjs/common";
import { HrEntity } from "./entities/hr.entity";
import { UserEntity } from "../user/entity/user.entity";
import { AdminCreateHrResponse, AdminInsertHr, UserRole } from "../types";

@Injectable()
export class HrService {
	async createHr(hr: AdminInsertHr): Promise<AdminCreateHrResponse> {
		const checkUser = await UserEntity.findOne({ where: { email: hr.email } });
		if (checkUser) {
			console.log("taki użytkownik istenieje");
		}

		const user = new UserEntity();

		const newHr = new HrEntity();

		try {
			user.email = hr.email;
			user.role = UserRole.HR;
			user.activeTokenId = hr.token;

			await user.save();
		} catch (e) {
			return e;
		}

		try {
			newHr.user = user;
			newHr.company = hr.company;
			newHr.maxReservationStudent = hr.maxReservationStudents;
			newHr.fullName = hr.fullName;

			await newHr.save();
			user.hr = newHr;
			await user.save();
		} catch (e) {
			return e;
		}
		return {
			isSuccess: true,
			userId: user.id,
			message: `Dodanie hr ${hr.email} powiodło się`,
		};
	}
}
