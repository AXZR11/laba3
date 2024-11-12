import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { RecordsEntity } from "./records.entity";
import { promises } from "dns";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(RecordsEntity)
        private recordsRepository: Repository<RecordsEntity>,
        private usersService: UsersService
    ) {}

    async createRecord(recordData: Partial<RecordsEntity> & { authorIdUser: number }, userId: number): Promise<RecordsEntity> {
        const user = await this.usersService.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found')
        }        

        const newRecord = this.recordsRepository.create({
            ...recordData,
            author: user,
            authorIdUser: user.id_user
        })

        const savedRecord = await this.recordsRepository.save(newRecord)

        console.log('Record successfully created')

        return savedRecord
    }

    async getAll(): Promise<RecordsEntity[]> {
        return this.recordsRepository.find()
    }

    async updateRecord(id_record: number, recordData: Partial<RecordsEntity>, userId: number): Promise<RecordsEntity> {
        const record = await this.recordsRepository.findOne({ where: { id_record, authorIdUser: userId } })

        if (!record) {
            throw new NotFoundException ('This record not found')
        }

        Object.assign(record, recordData)

        await this.recordsRepository.save(record)

        console.log('Record update successfully')
        return record
    }

    async removeRecord (id_record: number, userId: number): Promise<RecordsEntity> {
        const removedItem = await this.recordsRepository.findOne({ where: { id_record, authorIdUser: userId } })
        if(!removedItem) {
            throw new NotFoundException('This record not found')
        }

        return this.recordsRepository.remove(removedItem)
    }

    async getRecordById (id_record: string | number, userId: number): Promise<RecordsEntity> { 
        if (typeof id_record !== 'number' || isNaN(id_record)) {
            throw new BadRequestException('Invalid record ID');
        }
        console.log('getRecordById controller called with id:', id_record);
        const record = await this.recordsRepository.findOne({ where: { id_record, authorIdUser: userId } })
        console.log('Found record:', record)
        if(!record) {
            throw new NotFoundException('This record not found')
        }
        return record
    }

    async searchRecords(query: string): Promise<RecordsEntity[]> {
        return this.recordsRepository.find({
          where: [
            { title: Like(`%${query}%`) },
            { content: Like(`%${query}%`) },
          ]
        });
    }
}