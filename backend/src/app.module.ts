import { Module } from '@nestjs/common';
import { ScenariosModule } from './scenarios/scenarios.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HealthController } from './health.controller';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
    ScenariosModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}