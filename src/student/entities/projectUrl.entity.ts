import { ProjectUrlInterface } from "../../types/student/projectUrl";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class ProjectUrl extends BaseEntity implements ProjectUrlInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
	})
	projectUrl: string;

	@ManyToOne(() => Student, (student: Student) => student.projectUrls)
	@JoinColumn({name: 'studentId'})
	student: Student;
}
