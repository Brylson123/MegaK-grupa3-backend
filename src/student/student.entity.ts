import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateStudentDto } from "./dto/createStudentDto";

@Entity()
export class Student extends BaseEntity implements CreateStudentDto {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "text",
		unique: true,
		nullable: false,
	})
	email: string;

	@Column({
		type: "text",
		unique: true,
		nullable: true,
		length: "12",
	})
	tel: string;

	@Column({
		type: "text",
		nullable: false,
	})
	firstName: string;

	@Column({
		type: "text",
		nullable: false,
	})
	lastName: string;

	@Column({
		type: "text",
		nullable: false,
	})
	@Column({
		type: "text",
		nullable: true,
	})
	gitHubUserName: string;

	@Column({
		type: "array",
		nullable: true,
	})
	portfolioUrls: string[];

	@Column({
		type: "array",
		nullable: true,
	})
	projectUrls: string[];

    @Column({
		type: "text",
		nullable: false,
	})
	bio: string;

    @Column({
		type: "enum",
		nullable: false,
	})
	expectedTypeWork: string;

    @Column({
        type: "text",
        nullable: true,
    })
	targetWorkCity: string;

    @Column({
        type: "enum",
        nullable: true,
    })
	expectedContractType: string;

    @Column({
        type: "shorttext",
        default: "0",
    })
	expectedSalary: string;

    @Column({
        type: "enum",
        default: "nie",
    })
	canTakeApprenticeship: string;

    @Column({
        type: "int",
        default: 0,
    })
	monthsOfCommercialExp: number;
	
    @Column({
        type: "longtext",
        nullable: true,
    })
    education: string;

    @Column({
        type: "longtext",
        nullable: true,
    })
	workExperience: string;

    @Column({
        type: "longtext",
        nullable: true,
    })
	courses: string;
}
