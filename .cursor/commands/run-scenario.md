# Command: Run Scenario

## Название
run-scenario

## Описание
Быстро запустить сценарий через curl для проверки без UI

## Использование
Напиши в Cursor: /run-scenario [название сценария]

## Команды

### Запустить success
```bash
curl -X POST http://localhost:3000/api/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"type": "success"}'
```

### Запустить system_error
```bash
curl -X POST http://localhost:3000/api/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"type": "system_error"}'
```

### Запустить slow_request
```bash
curl -X POST http://localhost:3000/api/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"type": "slow_request"}'
```

### Запустить validation_error
```bash
curl -X POST http://localhost:3000/api/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"type": "validation_error"}'
```

### Посмотреть историю
```bash
curl http://localhost:3000/api/scenarios/history
```

### Посмотреть метрики
```bash
curl http://localhost:3000/metrics | grep scenario
```