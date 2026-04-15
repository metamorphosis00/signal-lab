import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ScenariosService } from './scenarios.service';

@Controller('api/scenarios')
export class ScenariosController {
    constructor(private readonly scenariosService: ScenariosService) {}

    @Post('run')
    async runScenario(@Body() body: { type: string; name?: string }, @Res() res: Response) {
        if (body.type === 'teapot') {
            return res.status(418).json({ signal: 42, message: "I'm a teapot" });
        }
        const result = await this.scenariosService.runScenario(body.type, body.name);
        return res.status(200).json(result);
    }

    @Get('history')
    async getHistory() {
        return this.scenariosService.getHistory();
    }
}