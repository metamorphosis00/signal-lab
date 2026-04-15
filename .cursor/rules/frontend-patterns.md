# Frontend Patterns

## Server State — TanStack Query

### Запросы данных (useQuery)
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['history'],
  queryFn: async () => {
    const res = await axios.get('/api/scenarios/history');
    return res.data;
  },
  refetchInterval: 3000,
});
```

### Мутации (useMutation)
```typescript
const mutation = useMutation({
  mutationFn: async (data) => {
    const res = await axios.post('/api/scenarios/run', data);
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['history'] });
    toast.success('Done');
  },
  onError: (error: any) => {
    toast.error(error.response?.data?.message || error.message);
  },
});
```

### Запрещено
- fetch() напрямую вместо axios
- SWR вместо TanStack Query
- useState + useEffect для server state

## Формы — React Hook Form

```typescript
const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
  defaultValues: { type: 'success' },
});
```

### Запрещено
- Controlled inputs с useState вместо RHF
- Другие библиотеки форм (Formik и т.д.)

## UI компоненты — shadcn/ui

- Всегда используй shadcn компоненты: Button, Card, Badge, Select
- Стилизация только через Tailwind CSS
- Не добавляй inline styles
- Не используй другие UI библиотеки (MUI, Chakra)

## Toast уведомления
```typescript
// Успех
toast.success('Message');

// Ошибка  
toast.error('Message');
```

## Запрещено
- Redux, Zustand для server state
- CSS modules вместо Tailwind
- alert() для уведомлений