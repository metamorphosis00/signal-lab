# Code Conventions

## Именование
- Файлы: kebab-case (scenarios.service.ts)
- Классы: PascalCase (ScenariosService)
- Методы и переменные: camelCase (runScenario)
- Константы: UPPER_SNAKE_CASE (MAX_RETRIES)

## NestJS
- Каждый модуль в отдельной папке внутри src/
- Структура модуля: module.ts, controller.ts, service.ts
- Всегда используй Logger из @nestjs/common для логов
- Всегда оборачивай ошибки в try/catch и отправляй в Sentry

## Prisma
- Все модели в schema.prisma с camelCase полями
- Всегда используй PrismaService через dependency injection
- Не используй PrismaClient напрямую вне PrismaService

## Frontend
- Все компоненты в app/ директории
- Используй "use client" только когда нужны хуки или события
- Все запросы к API через TanStack Query (useQuery, useMutation)
- Все формы через React Hook Form

## Git
- Коммиты на английском
- Формат: feat/fix/chore: описание (например feat: add slow_query scenario)