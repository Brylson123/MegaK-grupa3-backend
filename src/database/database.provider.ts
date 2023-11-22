import { config } from "../config/config-database-example";

export const databaseProviders = [
	{
		provide: "DATA_SOURCE",
		useFactory: async () => config.initialize(),
	},
];
