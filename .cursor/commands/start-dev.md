# Command: Start Dev

## Название
start-dev

## Описание
Запустить все сервисы для разработки

## Использование
Напиши в Cursor: /start-dev

## Команды запуска

### 1. Запустить PostgreSQL
```bash
brew services start postgresql@16
```

### 2. Запустить Backend (в отдельном терминале)
```bash
cd ~/Documents/signal-lab/backend
npm run start:dev
```

### 3. Запустить Frontend (в отдельном терминале)
```bash
cd ~/Documents/signal-lab/frontend
npm run dev
```

### 4. Запустить Docker сервисы (Prometheus, Grafana, Loki)
```bash
cd ~/Documents/signal-lab
docker compose up -d
```

## Проверка что всё работает
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- Метрики: http://localhost:3000/metrics
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3003
- Loki: http://localhost:3100

## Остановка всего
```bash
brew services stop postgresql@16
docker compose down
# Backend и Frontend — Ctrl+C в терминалах
```