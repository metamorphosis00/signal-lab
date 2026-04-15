import { Module } from '@nestjs/common';
import { ScenariosController } from './scenarios.controller';
import { ScenariosService } from './scenarios.service';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [ScenariosController],
    providers: [ScenariosService, PrismaService],
})
export class ScenariosModule {}