import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    size: Number

    @Column()
    key: string

    @Column()
    url: string

}