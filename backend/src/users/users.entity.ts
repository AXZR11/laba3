import { RecordsEntity } from "../records/records.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id_user: number

    @Column({unique: true})
    username: string

    @Column({type: 'text'})
    password: string

    @Column({ type: 'date', nullable: true })
    passwordUpdatedAt: Date | null

    @Column({ type: 'json', default: '[]' })
    previousPasswords: string[]

    @Column({ type: 'text', default: 'user' })
    role: string

    @Column({ type: 'boolean', default: false })
    isBlocked: boolean

    @Column({unique: true})
    email: string

    @OneToMany(() => RecordsEntity, (record) => record.author)
    records: RecordsEntity[]
}