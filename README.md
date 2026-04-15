# Signal Lab

Observability playground — приложение для демонстрации метрик, логов и ошибок в реальном времени.

## Стек

- **Frontend**: Next.js, shadcn/ui, Tailwind CSS, TanStack Query
- **Backend**: NestJS, Prisma, PostgreSQL
- **Observability**: Sentry, Prometheus, Grafana, Loki
- **Infra**: Docker Compose

## Быстрый старт

### 1. Запусти инфраструктуру
```bash
docker compose up -d
```

### 2. Запусти backend
```bash
cd backend
npm install
npm run start:dev
```

### 3. Запусти frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Открой приложение
- UI: http://localhost:3001
- Backend API: http://localhost:3000
- Метрики: http://localhost:3000/metrics
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3003 (admin/admin)
- Loki: http://localhost:3100

## Демонстрация

### Шаг 1 — Запусти сценарий
Открой http://localhost:3001 и нажми одну из кнопок:
- **High Load** — нагружает CPU, генерирует метрику
- **Slow Query** — имитирует медленный запрос (2 сек)
- **System Error** — генерирует ошибку, отправляет в Sentry

### Шаг 2 — Проверь метрики
Открой http://localhost:9090 → Status → Target health
Убедись что signal-lab-backend имеет статус UP

### Шаг 3 — Проверь Grafana
Открой http://localhost:3003 → Dashboards → Signal Lab
Видишь графики с метриками сценариев

### Шаг 4 — Проверь логи в Loki
Открой http://localhost:3003 → Explore → Loki
Введи запрос: {job="signal-lab"}

### Шаг 5 — Проверь Sentry
Открой https://sentry.io → твой проект → Issues
После запуска system_error увидишь новую ошибку

## Остановка

```bash
docker compose down
```

## Cursor AI Layer

В папке `.cursor/` находится AI-конфигурация для Cursor:

- `rules/` — правила стека и соглашения по коду
- `skills/` — навыки для добавления сценариев и observability
- `commands/` — быстрые команды для типовых задач
- `hooks/` — проверки качества кода

### Использование orchestrator skill
Открой новый чат в Cursor и напиши: