# Command: Check Observability

## Название
check-observability

## Описание
Быстрая проверка что все системы observability работают

## Использование
Напиши в Cursor: /check-observability

## Шаги проверки

### 1. Проверь health endpoint
```bash
curl http://localhost:3001/api/health
```
Ожидаем: `{ "status": "ok", "timestamp": "..." }`

### 2. Проверь историю запусков
```bash
curl http://localhost:3001/api/scenarios/history
```
Ожидаем: JSON массив с историей запусков

### 3. Проверь Prometheus метрики
```bash
curl http://localhost:3001/metrics | grep scenario
```
Ожидаем: scenario_runs_total с числами

### 4. Запусти тестовый сценарий
```bash
curl -X POST http://localhost:3001/api/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"type": "system_error"}'
```
Ожидаем: JSON с statusCode: 500

### 5. Проверь teapot
```bash
curl -X POST http://localhost:3001/api/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"type": "teapot"}'
```
Ожидаем: HTTP 418 с `{ "signal": 42, "message": "I'm a teapot" }`

### 6. Проверь Sentry
Открой https://sentry.io и проверь Issues
Ожидаем: новая ошибка "Simulated system error"

### 7. Проверь Grafana
Открой http://localhost:3003
Ожидаем: dashboard с метриками

## Результат
Если все шаги прошли — observability работает корректно