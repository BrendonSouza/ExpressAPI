import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

}