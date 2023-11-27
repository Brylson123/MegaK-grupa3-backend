import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { TestModule } from "./test/test.module";
import { StudentModule } from "./student/student.module";

@Module({
	imports: [DatabaseModule, TestModule, StudentModule, UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
