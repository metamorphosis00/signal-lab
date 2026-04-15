# Command: Start Dev

## Название
start-dev

## Описание
Запустить все сервисы для разработки

## Использование
Напиши в Cursor: /start-dev

## Быстрый старт (рекомендуется)

### Запустить всё одной командой
```bash
cd signal-lab
docker compose up -d
```

### Проверить что всё запустилось
```bash
docker compose ps
```

## Адреса сервисов
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger: http://localhost:3001/api/docs
- Метрики: http://localhost:3001/metrics
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3003 (admin/admin)
- Loki: http://localhost:3100

## Локальная разработка (без Docker)

### 1. Запустить PostgreSQL
```bash
brew services start postgresql@16
```

### 2. Запустить Backend (в отдельном терминале)
```bash
cd backend
npm run start:dev
```

### 3. Запустить Frontend (в отдельном терминале)
```bash
cd frontend
npm run dev
```

## Остановка

### Docker
```bash
docker compose down
```

### Локально
```bash
brew services stop postgresql@16
# Backend и Frontend — Ctrl+C в терминалах
```