import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ScenariosService } from './scenarios.service';

@Controller('api/scenarios')
export class ScenariosController {
    constructor(private readonly scenariosService: ScenariosService) {}

    @Post('run')
    @HttpCode(HttpStatus.OK)
    async runScenario(@Body() body: { type: string; name?: string }) {
        if (body.type === 'teapot') {
            return { signal: 42, message: "I'm a teapot" };
        }
        return this.scenariosService.runScenario(body.type, body.name);
    }

    @Get('history')
    async getHistory() {
        return this.scenariosService.getHistory();
    }
}