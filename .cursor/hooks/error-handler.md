# Hook: Error Handler

## Цель
Автоматически проверять что все ошибки правильно обрабатываются в новом коде.

## Когда срабатывает
- При создании нового сервиса в NestJS
- При добавлении нового метода с async/await
- При создании нового контроллера

## Что проверять

### Обязательный паттерн для каждого async метода
```typescript
async myMethod() {
  try {
    // логика
    this.logger.log('Success message');
  } catch (err) {
    this.logger.error(`Failed: ${err.message}`);
    Sentry.captureException(err);
    throw err; // или обработай ошибку
  }
}
```

### Запрещённые паттерны
```typescript
// ПЛОХО — ошибка проглочена
try {
  // логика
} catch (err) {
  // пусто!
}

// ПЛОХО — нет Sentry
} catch (err) {
  console.log(err);
}

// ПЛОХО — нет Logger
} catch (err) {
  Sentry.captureException(err);
}
```

## Автопроверка
Перед сохранением файла проверь:
- [ ] Каждый async метод обёрнут в try/catch
- [ ] В catch есть this.logger.error()
- [ ] В catch есть Sentry.captureException()