import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MailService } from "../mail/mail.service";
import { UserEntity } from "./entity/user.entity";

describe("UserService", () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, { provide: MailService, useValue: {} }],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("findOne", () => {
		it("should return user", async () => {
			const user = new UserEntity();
			Object.assign(user, { id: "1234" });

			jest.spyOn(UserEntity, "findOne").mockResolvedValueOnce(user);

			const result = await service.findOne("1234");

			expect(result).toEqual({
				id: "1234",
			});
		});
	});
});
