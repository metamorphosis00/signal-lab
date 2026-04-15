# Prisma Patterns

## Правила работы с Prisma

### Обязательно
- Всегда используй PrismaService через dependency injection
- Все изменения схемы через миграции: `npx prisma migrate dev`
- После изменения схемы: `npx prisma generate`

### Запрещено
- Raw SQL запросы (`$queryRaw`, `$executeRaw`) без крайней необходимости
- Использовать PrismaClient напрямую вне PrismaService
- Другие ORM (TypeORM, Sequelize, Knex)
- Хардкодить DATABASE_URL в коде

### Паттерн работы с данными
```typescript
// Правильно — через PrismaService
@Injectable()
export class MyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDto) {
    return this.prisma.myModel.create({ data });
  }

  async findMany() {
    return this.prisma.myModel.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }
}
```

### Nullable поля
```typescript
// Для Json? поля используй ?? undefined
metadata: metadata ?? undefined

// Для String? поля
error: error ?? null
```

### Миграции
1. Измени schema.prisma
2. `npx prisma migrate dev --name описание_изменения`
3. `npx prisma generate`
4. Перезапусти backend