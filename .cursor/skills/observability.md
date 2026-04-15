# Observability Skill

## Цель
Помочь добавить observability в любой новый код — метрики, логи, отслеживание ошибок.

## Когда использовать
- Добавляешь новый сценарий в ScenariosService
- Создаёшь новый endpoint в контроллере
- Нужно отследить производительность метода

## Шаблон для нового сценария

```typescript
// 1. Добавь счётчик и гистограмму в ScenariosService
private myCounter = new Counter({
  name: 'signal_lab_my_metric_total',
  help: 'Description of metric',
  labelNames: ['label'],
});

// 2. Оберни логику в try/catch
try {
  // логика сценария
  this.logger.log('Scenario completed');
} catch (err) {
  Sentry.captureException(err);
  this.logger.error(`Scenario failed: ${err.message}`);
  throw err;
}

// 3. Запиши метрику
this.myCounter.inc({ label: 'value' });
```

## Checklist при добавлении нового кода
- [ ] Есть Logger.log() для успешного пути
- [ ] Есть Logger.error() в catch блоке
- [ ] Есть Sentry.captureException() в catch блоке
- [ ] Есть Prometheus метрика (Counter или Histogram)
- [ ] Метрика имеет понятное имя с префиксом signal_lab_