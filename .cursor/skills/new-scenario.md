# New Scenario Skill

## Цель
Пошаговая инструкция для добавления нового сценария в Signal Lab.

## Шаги

### 1. Добавь метрику в ScenariosService
В начале класса добавь новый Counter:
```typescript
private myScenarioCounter = new Counter({
  name: 'signal_lab_my_scenario_total',
  help: 'Total runs of my scenario',
  labelNames: ['status'],
});
```

### 2. Добавь метод сценария
```typescript
private async simulateMyScenario() {
  // логика сценария
  this.logger.log('My scenario completed');
}
```

### 3. Добавь вызов в runScenario()
```typescript
if (scenarioName === 'my_scenario') {
  await this.simulateMyScenario();
}
```

### 4. Добавь кнопку на фронтенде
В app/page.tsx добавь в массив scenarios:
```typescript
{ name: 'my_scenario', label: 'My Scenario', description: 'Описание' },
```

### 5. Проверь observability
- [ ] Метрика появляется в /metrics после запуска
- [ ] Лог появляется в терминале
- [ ] Ошибка (если есть) появляется в Sentry