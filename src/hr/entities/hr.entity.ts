import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { HrInterface, HrToStudentInterface, UserInterface } from "../../types";
import { HrStudentEntity } from "./hr.student.entity";
import { UserEntity } from "../../user/entity/user.entity";

@Entity()
export class HrEntity extends BaseEntity implements HrInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		nullable: true,
	})
	fullName: string;

	@Column({
		type: "varchar",
		nullable: true,
	})
	company: string;

	@Column({
		type: "int",
	})
	maxReservationStudent: number;

	@OneToMany(() => HrStudentEntity, (entity) => entity.hr, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	studentInterview: HrToStudentInterface[];

	@OneToOne(() => UserEntity, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	user: UserInterface;
}
