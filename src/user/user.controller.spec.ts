import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";

describe("UserController", () => {
	let controller: UserController;
	let userService: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						findOne() {},
						createUser() {},
					},
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		userService = module.get(UserService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("should return user", async () => {
		// Arrange
		const user = new UserEntity();
		Object.assign(user, { id: "1234", email: "test@example.com" });
		jest.spyOn(userService, "findOne").mockImplementation(async () => user);

		// Act
		const result = await controller.findOne("1234");

		// Assert
		expect(result).toEqual({
			id: "1234",
			email: "test@example.com",
		});
		expect(userService.findOne).toHaveBeenCalledWith("1234");
	});

	it("should create user", async () => {
		const user = new UserEntity();
		Object.assign(user, {
			id: "1234",
			email: "test@example.com",
			pwdHash: "fsefsve",
			salt: "sfefscvs",
			currentTokenId: null,
			activeToken: "token1234",
			active: false,
			student: null,
			hr: null,
		});
		jest.spyOn(userService, "createUser").mockImplementation(async () => user);

		const result = await controller.createUser(user);

		expect(result).toEqual({
			id: "1234",
			email: "test@example.com",
			pwdHash: "fsefsve",
			salt: "sfefscvs",
			currentTokenId: null,
			activeToken: "token1234",
			active: false,
			student: null,
			hr: null,
		});
		expect(userService.createUser).toHaveBeenCalledWith(user);
	});
});
