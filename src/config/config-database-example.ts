import { DataSource, DataSourceOptions } from "typeorm";

export const config = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "PWD",
	database: "DBNAME",
	entities: ["dist/**/**.entity{.ts,.js}"],
	bigNumberStrings: false,
	logging: true,
	synchronize: true,
} as DataSourceOptions);
