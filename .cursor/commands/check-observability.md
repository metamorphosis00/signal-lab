# Command: Check Observability

## Название
check-observability

## Описание
Быстрая проверка что все системы observability работают

## Использование
Напиши в Cursor: /check-observability

## Шаги проверки

### 1. Проверь backend
```bash
curl http://localhost:3000/scenarios/history
```
Ожидаем: JSON массив с историей запусков

### 2. Проверь Prometheus метрики
```bash
curl http://localhost:3000/metrics | grep signal_lab
```
Ожидаем: signal_lab_scenario_runs_total с числами

### 3. Запусти тестовый сценарий
```bash
curl -X POST http://localhost:3000/scenarios/run \
  -H "Content-Type: application/json" \
  -d '{"scenarioName": "system_error"}'
```
Ожидаем: JSON с status: "error"

### 4. Проверь Sentry
Открой https://sentry.io и проверь Issues
Ожидаем: новая ошибка "Simulated system error"

### 5. Проверь Grafana (после docker compose up)
Открой http://localhost:3003
Ожидаем: dashboard с метриками

## Результат
Если все шаги прошли — observability работает корректно