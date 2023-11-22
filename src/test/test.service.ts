import { Injectable } from "@nestjs/common";
import { Test } from "./test.entity";
import { TestDto } from "./dto/dto";

@Injectable()
export class TestService {
	filter(test: Test) {
		const { id, name } = test;
		return { id, name };
	}
	async getTest(id: string): Promise<TestDto> {
		return await Test.findOneBy({ id });
	}
	async addTest(newTest: TestDto): Promise<TestDto> {
		const test = new Test();
		test.name = newTest.name;
		await test.save();

		return this.filter(test);
	}
}
