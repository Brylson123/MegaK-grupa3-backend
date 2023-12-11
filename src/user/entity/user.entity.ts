import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HrInterface, StudentInterface, UserInterface, UserRole } from "../../types";
import { StudentEntity } from "../../student/entities/student.entity";
import { HrEntity } from "../../hr/entities/hr.entity";

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		length: 255,
		unique: true,
	})
	email: string;

	@Column()
	pwdHash: string;

	@Column()
	salt: string;

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
	})
	@JoinColumn()
	student: StudentInterface;

	@OneToOne(() => HrEntity, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
	hr: HrInterface;
}
