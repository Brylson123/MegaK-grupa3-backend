import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HrEntity } from "./hr.entity";
import { HrInterface } from "src/types";
import { StudentEntity } from "../../student/entities/student.entity";

@Entity()
export class HrStudentEntity extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	studentId: string;

	@Column()
	hrId: string;

	@ManyToOne(() => HrEntity, (entity) => entity.studentInterview, {
		onDelete: "CASCADE",
	})
	hr: HrInterface;

	@ManyToOne(() => StudentEntity, (entity) => entity.hrs, {
		onDelete: "CASCADE",
	})
	student: StudentEntity;

	@Column({
		nullable: true,
		default: null,
	})
	reservationTo: Date;
}
