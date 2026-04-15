# Hook: Pre-commit

## Цель
Проверять код перед каждым коммитом — не допускать ошибок в репозиторий.

## Что проверяет
1. TypeScript компиляция без ошибок
2. Все новые сценарии имеют Prometheus метрику
3. Все catch блоки отправляют ошибку в Sentry

## Команды проверки

### Проверить TypeScript backend
```bash
cd ~/Documents/signal-lab/backend
npx tsc --noEmit
```

### Проверить TypeScript frontend
```bash
cd ~/Documents/signal-lab/frontend
npx tsc --noEmit
```

### Проверить что нет console.log (используй Logger)
```bash
grep -r "console.log" ~/Documents/signal-lab/backend/src
```

## Checklist перед коммитом
- [ ] TypeScript компилируется без ошибок
- [ ] Нет console.log в backend коде
- [ ] Все новые методы имеют Logger.log()
- [ ] Все catch блоки имеют Sentry.captureException()
- [ ] Все новые метрики имеют префикс signal_lab_
- [ ] README обновлён если добавлен новый функционал