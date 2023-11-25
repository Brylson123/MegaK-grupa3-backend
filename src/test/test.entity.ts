import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 50 })
	name: string;
}
