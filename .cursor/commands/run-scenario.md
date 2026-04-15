# Command: Run Scenario

## Название
run-scenario

## Описание
Быстро запустить сценарий через curl для проверки без UI

## Использование
Напиши в Cursor: /run-scenario [название сценария]

## Команды

### Запустить high_load
```bash
curl -X POST http://localhost:3000/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"scenarioName": "high_load"}'
```

### Запустить system_error
```bash
curl -X POST http://localhost:3000/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"scenarioName": "system_error"}'
```

### Запустить slow_query
```bash
curl -X POST http://localhost:3000/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"scenarioName": "slow_query"}'
```

### Посмотреть историю
```bash
curl http://localhost:3000/scenarios/history
```

### Посмотреть метрики
```bash
curl http://localhost:3000/metrics | grep signal_lab
```