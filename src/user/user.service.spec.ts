import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { MailService } from "../mail/mail.service";

describe("UserService", () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{provide: MailService, useValue: {}}
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
