# Stack Rules

## Обязательный стек — не менять без аргументации

### Frontend
- Next.js (App Router)
- shadcn/ui для компонентов
- Tailwind CSS для стилей
- TanStack Query для запросов к API
- React Hook Form для форм

### Backend
- NestJS
- Prisma + PostgreSQL
- Prometheus через @willsoto/nestjs-prometheus
- Sentry через @sentry/node
- Winston для логов

### Инфра
- Docker Compose — всё поднимается одной командой

## Запрещено
- Менять NestJS на Express или Fastify
- Менять Next.js на Vite/CRA
- Менять Prisma на TypeORM или Sequelize
- Использовать любые ORM кроме Prisma
- Использовать fetch напрямую вместо TanStack Query на фронте

## Соглашения
- Все файлы backend на TypeScript strict mode
- Все сервисы — Injectable классы NestJS
- Все ошибки логируются через Logger и отправляются в Sentry
- Все новые сценарии добавляются в ScenariosService