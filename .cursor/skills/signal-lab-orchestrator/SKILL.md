---
name: signal-lab-orchestrator
description: PRD executor для Signal Lab. Принимает PRD и проводит его через pipeline: анализ → план → декомпозиция → реализация → review.
version: 1.0.0
---

# Signal Lab Orchestrator

## When to Use
- Когда нужно реализовать новый PRD с нуля
- Когда задача слишком большая для одного чата
- Когда нужно разбить работу на атомарные задачи для малых моделей

## Как запустить

```
Use the Signal Lab orchestrator skill to implement PRD: [путь к PRD или текст]
```

## Фазы выполнения

| # | Фаза | Модель | Описание |
|---|------|--------|----------|
| 1 | PRD Analysis | fast | Разбирает PRD на требования и constraints |
| 2 | Codebase Scan | fast | Понимает текущую структуру проекта |
| 3 | Planning | default | Высокоуровневый план реализации |
| 4 | Decomposition | default | Разбивка на атомарные задачи |
| 5 | Implementation | fast (80%) / default (20%) | Выполнение задач |
| 6 | Review | fast | Проверка качества |
| 7 | Report | fast | Итоговый отчёт |

## Context File

Orchestrator создаёт `.execution/<timestamp>/context.json`:

```json
{
  "executionId": "2026-04-15-14-30",
  "prdPath": "prds/002_prd-observability-demo.md",
  "status": "in_progress",
  "currentPhase": "implementation",
  "phases": {
    "analysis": { "status": "completed", "result": "..." },
    "planning": { "status": "completed", "result": "..." },
    "decomposition": { "status": "completed", "result": "..." },
    "implementation": { "status": "in_progress", "completedTasks": 5, "totalTasks": 8 },
    "review": { "status": "pending" },
    "report": { "status": "pending" }
  },
  "signal": 42,
  "tasks": [
    {
      "id": "task-001",
      "title": "Add ScenarioRun model to Prisma schema",
      "type": "database",
      "complexity": "low",
      "model": "fast",
      "status": "completed"
    }
  ]
}
```

## Правила декомпозиции задач

### fast model (80% задач)
- Добавить поле в Prisma schema
- Создать DTO с валидацией
- Создать простой endpoint
- Добавить метрику или лог
- Создать UI компонент без сложной логики

### default model (20% задач)
- Планирование архитектуры
- Сложная бизнес-логика
- Интеграция нескольких систем
- Review с анализом trade-offs

## Review Loop

```
Для каждого домена (database, backend, frontend):
  1. Запустить reviewer subagent (readonly)
  2. Если не прошёл → запустить implementer с feedback
  3. Повторить до 3 раз
  4. Если не прошёл после 3 попыток → пометить failed, продолжить
```

## Возобновление после сбоя

```
Resume orchestrator from .execution/<timestamp>/context.json
```

Completed фазы не перевыполняются. Failed задачи не блокируют остальные.

## Используемые skills
- observability skill — для добавления метрик и логов
- new-scenario skill — для добавления новых сценариев
- Marketplace: nestjs-best-practices, prisma-orm, docker-expert