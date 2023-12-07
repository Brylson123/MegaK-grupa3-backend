import { Injectable } from "@nestjs/common";
import { MailerService } from "@nest-modules/mailer";

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	
	async sendMail(to: string, subject: string, html: string): Promise<any> {
		const emailAdress: string = "rnowosielski77@gmail.com";
		await this.mailerService.sendMail({
			to: "rnowosielski77@gmail.com",
			subject: "test email from api",
			html: "test message from api",
		});
	}
}
