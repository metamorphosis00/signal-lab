import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as Sentry from '@sentry/node';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class ScenariosService {
    private readonly logger = new Logger(ScenariosService.name);

    private scenarioCounter = new Counter({
        name: 'signal_lab_scenario_runs_total',
        help: 'Total number of scenario runs',
        labelNames: ['scenario', 'status'],
    });

    private scenarioDuration = new Histogram({
        name: 'signal_lab_scenario_duration_ms',
        help: 'Scenario duration in milliseconds',
        labelNames: ['scenario'],
        buckets: [10, 50, 100, 500, 1000, 2000, 5000],
    });

    constructor(private prisma: PrismaService) {}

    async runScenario(scenarioName: string) {
        const startTime = Date.now();
        let status = 'success';
        let error: string | null = null;

        try {
            if (scenarioName === 'system_error') {
                throw new Error('Simulated system error for observability demo');
            }

            if (scenarioName === 'high_load') {
                await this.simulateHighLoad();
            }

            if (scenarioName === 'slow_query') {
                await this.simulateSlowQuery();
            }

            this.logger.log(`Scenario ${scenarioName} completed successfully`);
        } catch (err) {
            status = 'error';
            error = err.message;
            this.logger.error(`Scenario ${scenarioName} failed: ${err.message}`);
            Sentry.captureException(err);
        }

        const duration = Date.now() - startTime;

        this.scenarioCounter.inc({ scenario: scenarioName, status });
        this.scenarioDuration.observe({ scenario: scenarioName }, duration);

        const run = await this.prisma.scenarioRun.create({
            data: {
                scenarioName,
                status,
                duration,
                error,
            },
        });

        return run;
    }

    async getHistory() {
        return this.prisma.scenarioRun.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
    }

    private async simulateHighLoad() {
        let result = 0;
        for (let i = 0; i < 10_000_000; i++) {
            result += Math.sqrt(i);
        }
        this.logger.log(`High load simulation done, result: ${result}`);
    }

    private async simulateSlowQuery() {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.logger.log('Slow query simulation done');
    }
}