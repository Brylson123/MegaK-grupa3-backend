import { Test, TestingModule } from "@nestjs/testing";
import { StudentService } from "./student.service";
import { HttpService } from "@nestjs/axios";
import { ValidateCreateStudent } from "../utils/validateCreateStudent";
import { MailService } from "../mail/mail.service";

describe("StudentService", () => {
	let service: StudentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StudentService,
				{ provide: HttpService, useValue: {} },
				{ provide: ValidateCreateStudent, useValue: {} },
				{ provide: MailService, useValue: {}}
			],
		}).compile();

		service = module.get<StudentService>(StudentService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
