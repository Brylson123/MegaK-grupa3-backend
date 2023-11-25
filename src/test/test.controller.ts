import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestDto } from "./dto/dto";

@Controller("test")
export class TestController {
	constructor(private readonly testService: TestService) {}

	@Get("/:id")
	async getTest(@Param("id") id: string): Promise<TestDto> {
		return await this.testService.getTest(id);
	}
	@Post("/")
	async addTest(@Body() newTest: TestDto): Promise<TestDto> {
		return await this.testService.addTest(newTest);
	}
}
