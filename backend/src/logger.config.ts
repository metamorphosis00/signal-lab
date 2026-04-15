import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

export const loggerConfig = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
        new LokiTransport({
            host: 'http://localhost:3100',
            labels: { job: 'signal-lab' },
            json: true,
            format: winston.format.json(),
            replaceTimestamp: true,
            onConnectionError: (err) => console.error('Loki connection error:', err),
        }),
    ],
});