import { Module } from '@nestjs/common';
import { ScenariosModule } from './scenarios/scenarios.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
    ScenariosModule,
  ],
})
export class AppModule {}