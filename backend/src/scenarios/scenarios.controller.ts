import { Controller, Post, Get, Body } from '@nestjs/common';
import { ScenariosService } from './scenarios.service';

@Controller('scenarios')
export class ScenariosController {
    constructor(private readonly scenariosService: ScenariosService) {}

    @Post('run')
    async runScenario(@Body() body: { scenarioName: string }) {
        return this.scenariosService.runScenario(body.scenarioName);
    }

    @Get('history')
    async getHistory() {
        return this.scenariosService.getHistory();
    }
}