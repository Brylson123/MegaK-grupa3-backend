import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hr } from "./hr.entity";

import { HrInterface } from "src/types";
import { Student } from "../../student/entities/student.entity";

@Entity()
export class HrStudentEntity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	studentId: string;

	@Column()
	hrId: string;

	@ManyToOne(() => Hr, (entity) => entity.studentInterview, {
		onDelete: "CASCADE",
	})
	hr: HrInterface;

	@ManyToOne(() => Student, (entity) => entity.hrs, {
		onDelete: "CASCADE",
	})
	student: Student;

	@Column({
		nullable: true,
		default: null,
	})
	reservationTo: Date;
}
