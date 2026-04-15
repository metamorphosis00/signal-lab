import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as Sentry from '@sentry/node';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class ScenariosService {
    private readonly logger = new Logger(ScenariosService.name);

    private scenarioCounter = new Counter({
        name: 'scenario_runs_total',
        help: 'Total number of scenario runs',
        labelNames: ['type', 'status'],
    });

    private scenarioDuration = new Histogram({
        name: 'scenario_run_duration_seconds',
        help: 'Scenario duration in seconds',
        labelNames: ['type'],
        buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
    });

    constructor(private prisma: PrismaService) {}

    async runScenario(type: string, name?: string) {
        const startTime = Date.now();
        let status = 'completed';
        let error: string | null = null;
        let metadata: object | null = null;

        try {
            if (type === 'validation_error') {
                this.logger.warn(`Validation error scenario triggered`, { type, name });
                throw new BadRequestException('Invalid scenario input: validation failed');
            }

            if (type === 'system_error') {
                throw new InternalServerErrorException('Simulated system error for observability demo');
            }

            if (type === 'slow_request') {
                const delay = Math.floor(Math.random() * 3000) + 2000;
                await this.simulateSlowRequest(delay);
                this.logger.warn(`Slow request scenario completed`, { type, delay });
            }

            if (type === 'teapot') {
                metadata = { easter: true };
                this.logger.log(`Teapot scenario triggered`, { type });
            }

            if (type === 'success') {
                this.logger.log(`Success scenario completed`, { type, name });
            }

        } catch (err) {
            if (err instanceof BadRequestException) {
                throw err;
            }
            status = 'failed';
            error = err.message;
            this.logger.error(`Scenario failed: ${err.message}`, { type, name });
            Sentry.captureException(err);

            const duration = (Date.now() - startTime) / 1000;
            this.scenarioCounter.inc({ type, status: 'error' });
            this.scenarioDuration.observe({ type }, duration);

            await this.prisma.scenarioRun.create({
                data: { type, status, duration: Date.now() - startTime, error, metadata: metadata ?? undefined },
            });

            throw err;
        }

        const duration = Date.now() - startTime;
        this.scenarioCounter.inc({ type, status: 'completed' });
        this.scenarioDuration.observe({ type }, duration / 1000);

        const run = await this.prisma.scenarioRun.create({
            data: { type, status, duration, error, metadata: metadata ?? undefined },
        });

        return run;
    }

    async getHistory() {
        return this.prisma.scenarioRun.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
    }

    private async simulateSlowRequest(delay: number) {
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}