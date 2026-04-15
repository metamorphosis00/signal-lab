# Example — Running PRD 002

## Как запустить orchestrator

Открой новый чат в Cursor и напиши:

```
Use the Signal Lab orchestrator skill to implement PRD 002.
PRD path: prds/002_prd-observability-demo.md
```

## Что произойдёт

### Шаг 1 — Orchestrator создаст execution directory
```
.execution/
  2026-04-15-14-30/
    context.json
```

### Шаг 2 — context.json после анализа
```json
{
  "executionId": "2026-04-15-14-30",
  "prdPath": "prds/002_prd-observability-demo.md",
  "status": "in_progress",
  "currentPhase": "decomposition",
  "phases": {
    "analysis": { "status": "completed" },
    "codebase": { "status": "completed" },
    "planning": { "status": "completed" },
    "decomposition": { "status": "in_progress" },
    "implementation": { "status": "pending" },
    "review": { "status": "pending" },
    "report": { "status": "pending" }
  },
  "tasks": [
    {
      "id": "task-001",
      "title": "Add metadata field to Prisma schema",
      "type": "database",
      "complexity": "low",
      "model": "fast",
      "status": "completed"
    },
    {
      "id": "task-002",
      "title": "Add validation_error scenario to ScenariosService",
      "type": "backend",
      "complexity": "low",
      "model": "fast",
      "status": "pending"
    }
  ]
}
```

### Шаг 3 — Финальный отчёт
```
Signal Lab PRD 002 Execution — Complete

Tasks: 8 completed, 0 failed, 1 retry
Duration: ~20 min
Model usage: 7 fast, 1 default

Completed:
  ✓ Prisma schema updated
  ✓ All 4 scenario types implemented
  ✓ Prometheus metrics added
  ✓ Structured logging configured
  ✓ Sentry integration
  ✓ Frontend scenario form
  ✓ Run history with badges
  ✓ Grafana dashboard provisioned

Next steps:
  - Run docker compose up -d
  - Open localhost:3001 and test all scenarios
  - Verify metrics at localhost:9090
```

## Возобновление после сбоя

Если orchestrator прервался — просто напиши:
```
Resume orchestrator execution from .execution/2026-04-15-14-30/context.json
```

Orchestrator прочитает context.json и продолжит с текущей фазы.