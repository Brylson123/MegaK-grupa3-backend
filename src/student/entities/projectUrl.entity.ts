import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";
import { ProjectUrlInterface } from "../../types";

@Entity()
export class ProjectUrl extends BaseEntity implements ProjectUrlInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
	})
	projectUrl: string;

	@ManyToOne(() => StudentEntity, (student: StudentEntity) => student.projectUrls, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "studentId" })
	student: StudentEntity;
}
