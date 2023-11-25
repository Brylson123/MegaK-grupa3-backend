import { ProjectUrlInterface } from "src/types/student/projectUrl";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ProjectUrl extends BaseEntity implements ProjectUrlInterface {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
    })
    projectUrl: string;
}