import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { StudentModule } from "./student/student.module";
import { HrModule } from "./hr/hr.module";
import { MailModule } from './mail/mail.module';
import { AdminModule } from "./admin/admin.module";
@Module({
	imports: [DatabaseModule, StudentModule, UserModule, HrModule, AdminModule, MailModule],

	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
