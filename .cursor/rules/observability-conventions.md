# Observability Conventions

## Метрики (Prometheus)

### Naming
- Префикс: `scenario_` для метрик сценариев
- Формат: `snake_case`
- Counter: суффикс `_total`
- Histogram: суффикс `_seconds` или `_duration`

### Обязательные метрики для каждого endpoint
```typescript
// Counter — сколько раз вызвали
private myCounter = new Counter({
  name: 'scenario_my_action_total',
  help: 'Total number of my actions',
  labelNames: ['status'],
});

// Histogram — как долго выполнялось
private myDuration = new Histogram({
  name: 'scenario_my_action_duration_seconds',
  help: 'Duration of my action',
  labelNames: ['type'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});
```

## Логи (Loki)

### Формат
Всегда используй структурированные логи с контекстом:
```typescript
this.logger.log('Message', { scenarioType, scenarioId, duration });
this.logger.warn('Slow request', { type, delay });
this.logger.error('Failed', { type, error: err.message });
```

### Уровни
- `log` — успешные операции
- `warn` — медленные запросы, validation errors
- `error` — system errors, unhandled exceptions

### Запрещено
- `console.log` вместо Logger
- Логи без контекста: `this.logger.log('done')`
- Логирование паролей или токенов

## Sentry

### Когда отправлять
- Все ошибки 5xx → `Sentry.captureException(err)`
- Validation errors → опционально `Sentry.addBreadcrumb()`
- Никогда не отправлять PII (email, пароли)

### DSN
- Всегда через env переменную `SENTRY_DSN`
- Никогда не хардкодить DSN в коде