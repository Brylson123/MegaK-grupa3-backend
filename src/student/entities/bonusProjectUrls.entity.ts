import { BonusProjectUrlInterface } from "../../types";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity()
export class BonusProjectUrl extends BaseEntity implements BonusProjectUrlInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		nullable: true,
	})
	bonusProjectUrl: string;

	@ManyToOne(() => StudentEntity, (student) => student.bonusProjectUrls, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	student: StudentEntity;
}
