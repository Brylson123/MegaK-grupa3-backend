import { PortfolioUrlInterface } from "../../types";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity()
export class PortfolioUrl extends BaseEntity implements PortfolioUrlInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
	})
	portfolioUrl: string;

	@ManyToOne(() => StudentEntity, (student) => student.portfolioUrls)
	@JoinColumn()
	student: StudentEntity;
}
