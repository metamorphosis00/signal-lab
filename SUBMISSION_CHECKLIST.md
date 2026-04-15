# Submission Checklist

## Кандидат
- Имя: Islam
- Репозиторий: https://github.com/metamorphosis00/signal-lab

---

## PRD 001 — Platform Foundation

- [x] `docker compose up -d` поднимает всё без ошибок
- [x] `GET /api/health` возвращает 200
- [x] Frontend открывается в браузере (localhost:3000)
- [x] Prisma schema содержит модель ScenarioRun с миграцией
- [x] Использованы все обязательные frontend библиотеки
- [x] README достаточен для запуска за 3 минуты
- [x] Swagger доступен на `/api/docs`
- [x] Global exception filter подключён
- [x] `.env.example` содержит все переменные

---

## PRD 002 — Observability Demo

- [x] 4 типа сценариев работают из UI (success, validation_error, system_error, slow_request)
- [x] Easter egg: teapot возвращает HTTP 418 с { signal: 42 }
- [x] Каждый run сохраняется в PostgreSQL
- [x] `GET /metrics` возвращает Prometheus формат
- [x] Grafana dashboard имеет минимум 3 панели
- [x] Логи доступны в Loki
- [x] system_error виден в Sentry
- [x] Observability links в UI

---

## PRD 003 — Cursor AI Layer

- [x] 5 rules файлов: stack, conventions, error-handling, observability-conventions, prisma-patterns, frontend-patterns
- [x] 3 custom skills: observability, new-scenario, signal-lab-orchestrator
- [x] 3 commands: start-dev, run-scenario, check-observability
- [x] 2 hooks: pre-commit, error-handler
- [x] 8 marketplace skills с обоснованием

---

## PRD 004 — Orchestrator

- [x] Orchestrator skill существует в `.cursor/skills/signal-lab-orchestrator/`
- [x] SKILL.md с frontmatter и фазами
- [x] COORDINATION.md с промптами для subagents
- [x] EXAMPLE.md с примером использования
- [x] context.json структура описана
- [x] Разделение fast/default моделей
- [x] Resume после сбоя описан

---

## Verification Walkthrough

```bash
git clone https://github.com/metamorphosis00/signal-lab
cd signal-lab

# Создать env файл и добавить SENTRY_DSN
cp .env.example .env

# Запустить все сервисы одной командой
docker compose up -d
```

Проверка:
1. http://localhost:3000 — UI загружен
2. Выбрать "success" → Run → зелёный badge в истории
3. Выбрать "system_error" → Run → красный badge + toast
4. http://localhost:3001/metrics — видеть scenario_runs_total
5. http://localhost:3003 — Grafana dashboard с графиками
6. Grafana → Explore → Loki: `{job="signal-lab"}` → логи
7. sentry.io → Issues → ошибка от system_error
8. http://localhost:3001/api/docs → Swagger

---

## Заметки

### Что реализовано сверх требований
- Easter egg сценарий teapot (HTTP 418)
- 8 marketplace skills вместо минимальных 6
- Observability links прямо в UI
- Toast уведомления с деталями каждого запуска

### Технические решения
- Prisma 5 вместо 7 — из-за изменений API в v7
- Winston-loki для отправки логов напрямую без Promtail
- Frontend на порту 3000, backend на 3001 (для соответствия assignment flow)