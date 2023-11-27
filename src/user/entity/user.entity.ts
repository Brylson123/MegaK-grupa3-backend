import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInterface, UserRole } from "../../types";
import { StudentEntity } from "../../student/entities/student.entity";
import { HrEntity } from "../../hr/entities/hr.entity";

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "varchar",
		nullable: false,
		unique: true,
	})
	email: string;

	@Column({
		type: "varchar",
	})
	pwdHash: string;

	@Column({
		type: "varchar",
	})
	salt: string;

	@Column({
		type: "varchar",
		nullable: true,
		default: null,
	})
	currentTokenId: string | null;

	@Column({
		type: "varchar",
		nullable: true,
	})
	activeTokenId: string | null;

	@Column({
		type: "tinyint",
		default: false,
	})
	active: boolean;

	@Column({
		type: "tinyint",
	})
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
