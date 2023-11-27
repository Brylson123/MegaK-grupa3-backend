import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HrInterface, StudentInterface, UserInterface, UserRole } from "../types";
import { StudentEntity } from "../student/entities/student.entity";
import { HrEntity } from "../hr/entities/hr.entity";

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		length: 150,
		nullable: false,
		unique: true,
	})
	email: string;

	@Column()
	pwdHash: string;

	@Column({
		nullable: true,
		default: null,
	})
	currentTokenId: string | null;

	@Column({
		nullable: true,
	})
	activeTokenId: string | null;

	@Column({
		default: false,
	})
	active: boolean;

	@Column()
	role: UserRole;

	@OneToOne(() => StudentEntity, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	student: StudentEntity;

	@OneToOne(() => HrEntity, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn()
	hr: HrEntity;
}
