import { Body, Controller, Post } from "@nestjs/common";
import { HrService } from "./hr.service";
import { InsertHr } from "../types";

@Controller("/hr")
export class HrController {
	constructor(private readonly hrService: HrService) {}
	@Post("/addHr")
	createNewHr(@Body() body: InsertHr) {
		return this.hrService.createHr(body);
	}
}
