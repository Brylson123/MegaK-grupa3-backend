import { Test, TestingModule } from "@nestjs/testing";
import { HrController } from "./hr.controller";
import { HrService } from "./hr.service";
import { StudentService } from "../student/student.service";

describe("HrController", () => {
	let controller: HrController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HrController],
			providers: [
				{ provide: HrService, useValue: {} },
				{ provide: StudentService, useValue: {} },
			],
		}).compile();

		controller = module.get<HrController>(HrController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
