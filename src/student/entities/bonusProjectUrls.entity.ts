import { BonusProjectUrlInterface } from "../../types";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class BonusProjectUrl extends BaseEntity implements BonusProjectUrlInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
	})
	bonusProjectUrl: string;

	@ManyToOne(() => Student, (student) => student.bonusProjectUrls)
	@JoinColumn()
	student: Student;
}
