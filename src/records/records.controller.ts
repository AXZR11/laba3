import { Request, BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsEntity } from "./records.entity";
import { ParseIntPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('api/records')
export class RecordsController {
    constructor (private readonly recordsService: RecordsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createRecord(
        @Body() recordData: RecordsEntity,
        @Request() req
    ): Promise<{ message: string; title: string } | { error: string }> {
        const userId = req.user.userId
        const newRecord = await this.recordsService.createRecord(recordData, userId)

        return {
            message: 'Record successfully created',
            title: newRecord.title
        }
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllRecords(): Promise<RecordsEntity[]> {
        return this.recordsService.getAll()
    }
    @Get('search')
    @UseGuards(JwtAuthGuard)
    async search(@Query('query') query: string): Promise<RecordsEntity[]> {
        return this.recordsService.searchRecords(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getRecordById(
        @Param('id') id_record: string,
        @Request() req
    ): Promise<RecordsEntity | { error: string }> {
        console.log('Received ID:', id_record)
        const userId = req.user.userId
        try {
            const record = await this.recordsService.getRecordById(+id_record, userId)
            return record
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { error: error.message }
            }
            throw error
        }
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateRecords(
        @Param('id') id_record: number,
        @Body() recordData: Partial<RecordsEntity>,
        @Request() req
    ): Promise<RecordsEntity | { error: string }> {
        const userId = req.user.userId
        try {
            const result = await this.recordsService.updateRecord(+id_record, recordData, userId)
            return result
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { error: error.message }
            }
            throw error
        }
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteRecord(
        @Param('id') id_record: number,
        @Request() req
    ): Promise<{ message: string }> {
        const userId = req.user.userId
        await this.recordsService.removeRecord(+id_record, userId)
        return { message: 'Record successfully removed' }
    } 
}