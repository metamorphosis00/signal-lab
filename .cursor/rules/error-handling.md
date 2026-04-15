# Error Handling Rules

## Backend

### Обязательный паттерн
Каждый async метод в сервисе должен иметь try/catch:

```typescript
try {
  // логика
  this.logger.log('Success', { context });
} catch (err) {
  this.logger.error(`Failed: ${err.message}`, { context });
  Sentry.captureException(err);
  throw err;
}
```

### HTTP исключения
- Используй исключения из @nestjs/common
- 400 → BadRequestException
- 404 → NotFoundException
- 500 → InternalServerErrorException
- Никогда не возвращай stack trace клиенту

### Global Exception Filter
- Все необработанные ошибки перехватывает GlobalExceptionFilter
- Ошибки 5xx автоматически отправляются в Sentry
- Ошибки 4xx логируются как warn

## Frontend

### Обязательный паттерн
Все запросы через TanStack Query useMutation:

```typescript
onError: (error: any) => {
  toast.error(`Failed`, {
    description: error.response?.data?.message || error.message,
  });
}
```

### Запрещено
- try/catch вокруг axios напрямую
- alert() для показа ошибок
- console.error вместо toast