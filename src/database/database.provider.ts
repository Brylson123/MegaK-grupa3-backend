import { config } from "../config/config-database";


export const databaseProviders = [
	{
		provide: "DATA_SOURCE",
		useFactory: async () => config.initialize(),
	},
];
