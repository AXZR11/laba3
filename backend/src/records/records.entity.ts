import { UsersEntity } from "../users/users.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'records'})
export class RecordsEntity{
    @PrimaryGeneratedColumn()
    id_record: number

    @Column()
    title: string

    @Column({type: 'text'})
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => UsersEntity, user => user.records, { nullable: true })
    author: UsersEntity

    @Column({ name: 'authorIdUser', nullable: true })
    authorIdUser: number;
}