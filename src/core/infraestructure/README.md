# 🏗️ Infrastructure Layer

La capa de infraestructura de Finvesta proporciona la implementación concreta de las interfaces definidas en el dominio, incluyendo acceso a base de datos, mappers y servicios externos.

## 📁 Estructura de Carpetas

```
src/core/infraestructure/
├── 📄 index.ts                           # Exporta todo desde infraestructure
├── 🗂️ mappers/                           # Conversión entre dominio y base de datos
│   ├── 📄 index.ts                       # Exporta todos los mappers
│   ├── 📄 account-mapper.ts              # Account ↔ PrismaAccount
│   ├── 📄 category-mapper.ts             # Category ↔ PrismaCategory
│   └── 📄 transaction-mapper.ts          # Transaction ↔ PrismaTransaction
├── 🗂️ repositories/                      # Acceso a datos y operaciones CRUD
│   ├── 📄 index.ts                       # Exporta repositorios y errores
│   ├── 🗂️ errors/                        # Errores específicos de infraestructura
│   │   ├── 📄 index.ts                   # Exporta todos los errores
│   │   └── 📄 infrastructure-errors.ts   # Definición de errores
│   ├── 🗂️ base/                          # Interfaces y clases base
│   │   └── 📄 repository.ts              # Interfaz Repository<T>
│   ├── 📄 account-repository.ts          # Repositorio de Account
│   ├── 📄 category-repository.ts         # Repositorio de Category
│   └── 📄 transaction-repository.ts      # Repositorio de Transaction
├── 🗂️ services/                          # Servicios de infraestructura
│   └── 📄 database-connection.service.ts # Conexión a base de datos
├── 🗂️ database/                          # Configuración de base de datos
└── 🗂️ config/                            # Configuración general
```

## 🎯 Responsabilidades

### **Mappers (`/mappers`)**

- **Propósito**: Convertir entre entidades del dominio y modelos de Prisma
- **Responsabilidades**:
  - `toDomain()`: Convierte modelo Prisma → Entidad del dominio
  - `toDatabase()`: Convierte entidad del dominio → Modelo Prisma
  - `toDatabaseUpdate()`: Convierte datos parciales para actualizaciones

### **Repositories (`/repositories`)**

- **Propósito**: Implementar operaciones CRUD y acceso a datos
- **Responsabilidades**:
  - Operaciones básicas: `create`, `findById`, `findAll`, `update`, `delete`, `exists`
  - Operaciones específicas por entidad
  - Manejo de errores del dominio
  - Soft delete (marcar como inactivo)

### **Errors (`/repositories/errors`)**

- **Propósito**: Manejar errores específicos de infraestructura
- **Responsabilidades**:
  - Errores de conexión a base de datos
  - Errores de operaciones CRUD
  - Errores de validación
  - Extender errores del dominio para contexto de infraestructura

### **Services (`/services`)**

- **Propósito**: Servicios de infraestructura como conexiones a BD
- **Responsabilidades**:
  - Singleton de PrismaClient
  - Gestión del ciclo de vida de conexiones
  - Configuración de base de datos

## 🔧 Patrones de Diseño

### **Repository Pattern**

```typescript
// Interfaz base
export interface Repository<T> {
  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(
    id: string,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}

// Implementación específica
export class AccountRepository implements Repository<Account> {
  // Implementación con Prisma
}
```

### **Mapper Pattern**

```typescript
export class AccountMapper {
  static toDomain(prismaAccount: PrismaAccount): Account {
    // Convierte Prisma → Domain
  }

  static toDatabase(domainAccount: Omit<Account, "id" | "createdAt" | "updatedAt">): PrismaAccountCreateInput {
    // Convierte Domain → Prisma
  }

  static toDatabaseUpdate(partialData: Partial<...>): PrismaAccountUpdateInput {
    // Convierte datos parciales para updates
  }
}
```

### **Error Handling Pattern**

```typescript
try {
  const result = await this.prisma.account.create({ data: prismaData });
  return AccountMapper.toDomain(result);
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes("Unique constraint failed")) {
      throw new DuplicateEntityError("Account", "name", data.name.getValue());
    }
    throw new DatabaseOperationError("create", "Account", error);
  }
  throw new DatabaseOperationError("create", "Account");
}
```

## 📊 Flujo de Datos

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Domain    │    │  Mappers    │    │   Prisma    │
│  Entities   │◄──►│             │◄──►│   Models    │
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                   ▲                   ▲
       │                   │                   │
       │                   │                   │
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│Repositories │    │  Services   │    │  Database   │
│             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 🚀 Uso

### **Importar desde la capa de infraestructura**

```typescript
import {
  AccountRepository,
  CategoryRepository,
  TransactionRepository,
  AccountMapper,
  CategoryMapper,
  TransactionMapper,
  DatabaseConnectionService,
} from "@/core/infraestructure";
```

### **Usar un repositorio**

```typescript
const accountRepo = new AccountRepository(prismaClient);

// Crear cuenta
const newAccount = await accountRepo.create({
  name: AccountName.create("Cuenta Principal"),
  balance: AccountBalance.create(1000.0),
  type: AccountType.fromString("checking"),
  currency: Currency.fromString("USD"),
  isActive: true,
});

// Buscar cuenta
const account = await accountRepo.findById("account-id");
```

### **Usar un mapper directamente**

```typescript
import { AccountMapper } from "@/core/infraestructure/mappers";

const domainAccount = AccountMapper.toDomain(prismaAccount);
const prismaData = AccountMapper.toDatabase(domainAccount);
```

## 🧪 Testing

### **Estructura de tests**

```
tests/core/infraestructure/
├── mappers/
│   ├── account-mapper.test.ts
│   ├── category-mapper.test.ts
│   └── transaction-mapper.test.ts
├── repositories/
│   ├── account-repository.test.ts
│   ├── category-repository.test.ts
│   └── transaction-repository.test.ts
└── services/
    └── database-connection.service.test.ts
```

### **Ejecutar tests**

```bash
# Todos los tests de infraestructura
pnpm test src/core/infraestructure

# Tests específicos de mappers
pnpm test tests/core/infraestructure/mappers

# Tests específicos de repositorios
pnpm test tests/core/infraestructure/repositories
```

## 🔒 Principios de Seguridad

1. **Validación de entrada**: Todos los datos se validan antes de llegar a la base de datos
2. **Sanitización**: Los mappers sanitizan los datos entre capas
3. **Manejo de errores**: Errores específicos sin exponer detalles internos
4. **Soft delete**: Las entidades se marcan como inactivas en lugar de eliminarse físicamente

## 📈 Escalabilidad

### **Agregar nuevo mapper**

1. Crear archivo en `/mappers/`
2. Implementar métodos `toDomain`, `toDatabase`, `toDatabaseUpdate`
3. Exportar en `/mappers/index.ts`
4. Crear tests correspondientes

### **Agregar nuevo repositorio**

1. Crear archivo en `/repositories/`
2. Implementar interfaz `Repository<T>`
3. Usar mapper correspondiente para conversiones
4. Implementar manejo de errores del dominio
5. Exportar en `/repositories/index.ts`
6. Crear tests correspondientes

### **Agregar nuevo tipo de error**

1. Definir en `/repositories/errors/infrastructure-errors.ts`
2. Extender errores del dominio cuando sea apropiado
3. Exportar en `/repositories/errors/index.ts`
4. Usar en repositorios correspondientes

## 🔗 Dependencias

- **Prisma ORM**: Para acceso a base de datos
- **Domain Layer**: Para entidades y value objects
- **Value Objects**: Para validación y encapsulación de datos

## 📝 Convenciones

1. **Nomenclatura**: Usar kebab-case para archivos, PascalCase para clases
2. **Imports**: Usar paths absolutos con `@/` cuando sea posible
3. **Exports**: Centralizar exports en archivos `index.ts`
4. **Error Handling**: Siempre usar errores del dominio o infraestructura
5. **Testing**: 100% coverage para mappers, 90%+ para repositorios
6. **Documentación**: JSDoc para métodos públicos complejos
