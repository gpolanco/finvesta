# Repositorios de Infraestructura

Esta capa implementa el patrón Repository para acceder a la base de datos usando Prisma ORM.

## Arquitectura

```
repositories/
├── base/
│   ├── repository.ts          # Interface base del repositorio
│   └── base-repository.ts     # Implementación abstracta con operaciones CRUD
├── account-repository.ts      # Repositorio específico para cuentas
├── category-repository.ts     # Repositorio específico para categorías
├── transaction-repository.ts  # Repositorio específico para transacciones
└── index.ts                   # Exportaciones centralizadas
```

## Características

- **Type Safety**: Uso completo de TypeScript con tipos generados por Prisma
- **CRUD Operations**: Operaciones básicas (Create, Read, Update, Delete)
- **Soft Delete**: Eliminación lógica manteniendo integridad referencial
- **Error Handling**: Manejo robusto de errores con mensajes descriptivos
- **Extensibilidad**: Fácil agregar métodos específicos por dominio

## Uso Básico

### 1. Configuración de Conexión

```typescript
import { DatabaseConnectionService } from "@/core/infraestructure/services/database-connection.service";

const dbService = DatabaseConnectionService.getInstance();
await dbService.connect();

const prisma = dbService.getPrismaClient();
```

### 2. Uso de Repositorios

```typescript
import { AccountRepository } from "@/core/infraestructure/repositories";

// Crear instancia
const accountRepo = new AccountRepository(prisma);

// Crear cuenta
const newAccount = await accountRepo.create({
  name: "Cuenta Principal",
  balance: 1000,
  type: "checking",
  currency: "USD",
});

// Buscar por ID
const account = await accountRepo.findById(newAccount.id);

// Actualizar
const updatedAccount = await accountRepo.update(newAccount.id, {
  balance: 1500,
});

// Eliminar (soft delete)
await accountRepo.delete(newAccount.id);
```

## Métodos Disponibles

### BaseRepository (Todos los repositorios)

- `create(data)` - Crear nueva entidad
- `findById(id)` - Buscar por ID
- `findAll()` - Obtener todas las entidades activas
- `update(id, data)` - Actualizar entidad
- `delete(id)` - Eliminación lógica
- `exists(id)` - Verificar existencia

### AccountRepository

- `findByName(name)` - Buscar por nombre
- `findByType(type)` - Buscar por tipo de cuenta
- `updateBalance(id, newBalance)` - Actualizar balance
- `getActiveAccounts()` - Obtener cuentas activas

### CategoryRepository

- `findByName(name)` - Buscar por nombre
- `findByType(type)` - Buscar por tipo
- `getActiveCategories()` - Obtener categorías activas
- `getCategoriesWithTransactionCount()` - Con conteo de transacciones

### TransactionRepository

- `findByAccountId(accountId)` - Buscar por cuenta
- `findByCategoryId(categoryId)` - Buscar por categoría
- `findByDateRange(startDate, endDate)` - Buscar por rango de fechas
- `getTransactionsWithRelations()` - Con relaciones incluidas
- `getTransactionSummary(accountId, startDate, endDate)` - Resumen financiero

## Ventajas de la Implementación

1. **Separación de Responsabilidades**: Lógica de acceso a datos separada del dominio
2. **Testabilidad**: Fácil mockear para tests unitarios
3. **Mantenibilidad**: Código limpio y fácil de extender
4. **Performance**: Queries optimizadas con Prisma
5. **Type Safety**: Tipos automáticos generados por Prisma

## Testing

Los repositorios incluyen tests completos que validan:

- Operaciones CRUD básicas
- Manejo de errores
- Casos edge y excepciones
- Integración con Prisma

## Próximos Pasos

- Implementar cache layer para queries frecuentes
- Agregar paginación para listas grandes
- Implementar transacciones de base de datos
- Agregar logging y métricas de performance
