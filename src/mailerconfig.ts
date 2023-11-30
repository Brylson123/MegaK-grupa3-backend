import { mailConfig } from "./config/config-mailer";
import { HandlebarsAdapter } from "@nest-modules/mailer";


export = {
	transport: {
		host: mailConfig.mailHost,
		port: mailConfig.mailPort,
		secure: mailConfig.mailSecure,
		auth: {
			user: mailConfig.adminEmail,
			pass: mailConfig.mailPassword,
		},
	},
	defaults: {
		from: mailConfig.adminEmail,
	},
	template: {
		dir: 'templates/email',
		adapter: new HandlebarsAdapter(),
		options: {
			strict: true,
		},
	},
	preview: mailConfig.mailPreview
};