# Signal Lab

Observability playground — приложение для демонстрации метрик, логов и ошибок в реальном времени.

## Стек

- **Frontend**: Next.js, shadcn/ui, Tailwind CSS, TanStack Query, React Hook Form
- **Backend**: NestJS, Prisma, PostgreSQL
- **Observability**: Sentry, Prometheus, Grafana, Loki
- **Infra**: Docker Compose

## Быстрый старт

### Предусловия
- Docker Desktop
- Git

### Запуск одной командой
```bash
git clone https://github.com/metamorphosis00/signal-lab
cd signal-lab
cp .env.example .env  # добавь свой SENTRY_DSN
docker compose up -d
```

### Проверка
```bash
curl http://localhost:3001/api/health
# {"status":"ok","timestamp":"..."}
```

### Остановка
```bash
docker compose down
```

## Адреса сервисов

| Сервис | URL |
|--------|-----|
| Frontend UI | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Swagger | http://localhost:3001/api/docs |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3003 |
| Loki | http://localhost:3100 |

## Демонстрация

### Шаг 1 — Запусти сценарий
Открой http://localhost:3000 и выбери сценарий:
- **success** — успешный запуск, зелёный badge
- **validation_error** — ошибка валидации (400)
- **system_error** — системная ошибка (500), попадает в Sentry
- **slow_request** — медленный запрос 2-5 сек
- **teapot** 🫖 — easter egg (418)

### Шаг 2 — Проверь метрики
```bash
curl http://localhost:3001/metrics | grep scenario
```

### Шаг 3 — Проверь Grafana
Открой http://localhost:3003 → Dashboards → Signal Lab

### Шаг 4 — Проверь логи в Loki
Открой http://localhost:3003 → Explore → Loki
Введи запрос: `{job="signal-lab"}`

### Шаг 5 — Проверь Sentry
Открой https://sentry.io → твой проект → Issues
После запуска system_error увидишь новую ошибку

## Cursor AI Layer

В папке `.cursor/` находится AI-конфигурация для Cursor:

| Папка | Содержимое |
|-------|------------|
| `rules/` | stack.md, conventions.md, error-handling.md, observability-conventions.md, prisma-patterns.md, frontend-patterns.md |
| `skills/` | observability.md, new-scenario.md, signal-lab-orchestrator/ |
| `commands/` | start-dev.md, run-scenario.md, check-observability.md |
| `hooks/` | pre-commit.md, error-handler.md |

### Использование orchestrator skill
Открой новый чат в Cursor и напиши:
Use the Signal Lab orchestrator skill to implement PRD: [путь к PRD]
Orchestrator разобьёт задачу на атомарные шаги и выполнит их последовательно,
сохраняя состояние в `.execution/<timestamp>/context.json`.

## Локальная разработка (без Docker)

```bash
# PostgreSQL
brew services start postgresql@16

# Backend
cd backend
npm install
npm run start:dev

# Frontend (новый терминал)
cd frontend
npm install
npm run dev
```