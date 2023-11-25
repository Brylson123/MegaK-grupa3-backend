import { PortfolioUrlInterface } from "src/types";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PortfolioUrl extends BaseEntity implements PortfolioUrlInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        type: "varchar",
    })
    portfolioUrl: string;
}