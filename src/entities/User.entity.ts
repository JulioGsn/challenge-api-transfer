import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column("decimal", { precision: 5, scale: 2 })
    balance: number
}
