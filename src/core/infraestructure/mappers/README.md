# 🗂️ Mappers

Los mappers son responsables de convertir entre entidades del dominio y modelos de Prisma, manteniendo la separación de responsabilidades y la integridad de los datos.

## 🎯 Propósito

- **Conversión de tipos**: Transformar datos entre diferentes representaciones
- **Sanitización**: Asegurar que los datos cumplan con las reglas del dominio
- **Encapsulación**: Ocultar detalles de implementación de la base de datos
- **Consistencia**: Mantener la coherencia entre capas

## 📁 Estructura

```
mappers/
├── 📄 index.ts                    # Exporta todos los mappers
├── 📄 account-mapper.ts           # Account ↔ PrismaAccount
├── 📄 category-mapper.ts          # Category ↔ PrismaCategory
└── 📄 transaction-mapper.ts       # Transaction ↔ PrismaTransaction
```

## 🔧 Métodos Estándar

Cada mapper implementa tres métodos principales:

### **`toDomain(prismaModel: PrismaModel): DomainEntity`**

Convierte un modelo de Prisma a una entidad del dominio.

```typescript
static toDomain(prismaAccount: PrismaAccount): Account {
  return {
    id: prismaAccount.id,
    name: AccountName.create(prismaAccount.name),
    balance: AccountBalance.create(Number(prismaAccount.balance)),
    type: AccountType.fromString(prismaAccount.type),
    currency: Currency.fromString(prismaAccount.currency),
    isActive: prismaAccount.isActive,
    createdAt: prismaAccount.createdAt,
    updatedAt: prismaAccount.updatedAt,
  };
}
```

### **`toDatabase(domainEntity: DomainEntity): PrismaCreateInput`**

Convierte una entidad del dominio a datos de entrada para Prisma.

```typescript
static toDatabase(domainAccount: Omit<Account, "id" | "createdAt" | "updatedAt">): PrismaAccountCreateInput {
  return {
    name: domainAccount.name.getValue(),
    balance: new Prisma.Decimal(domainAccount.balance.getValue()),
    type: domainAccount.type.getValue(),
    currency: domainAccount.currency.getCode(),
    isActive: domainAccount.isActive,
  };
}
```

### **`toDatabaseUpdate(partialData: Partial<DomainEntity>): PrismaUpdateInput`**

Convierte datos parciales para operaciones de actualización.

```typescript
static toDatabaseUpdate(domainAccount: Partial<Omit<Account, "id" | "createdAt" | "updatedAt">>): PrismaAccountUpdateInput {
  const updateData: PrismaAccountUpdateInput = {};

  if (domainAccount.name !== undefined) {
    updateData.name = domainAccount.name.getValue();
  }

  if (domainAccount.balance !== undefined) {
    updateData.balance = new Prisma.Decimal(domainAccount.balance.getValue());
  }

  // ... otros campos

  return updateData;
}
```

## 📊 Conversiones de Tipos

### **Tipos Primitivos**

- **String**: Directo entre dominio y Prisma
- **Number**: Conversión a `Prisma.Decimal` para montos
- **Boolean**: Directo entre dominio y Prisma
- **Date**: Directo entre dominio y Prisma

### **Value Objects**

- **AccountName**: `string` ↔ `AccountName`
- **AccountBalance**: `number` ↔ `Prisma.Decimal`
- **AccountType**: `string` ↔ `AccountType`
- **Currency**: `string` ↔ `Currency`

### **Campos Opcionales**

- **Description**: `undefined` ↔ `null`
- **CategoryId**: `string` ↔ `string | null`
- **UpdatedAt**: `Date | undefined` ↔ `Date | undefined`

## 🚀 Uso

### **Importar mapper**

```typescript
import { AccountMapper } from "@/core/infraestructure/mappers";
```

### **Conversión completa**

```typescript
// Prisma → Domain
const domainAccount = AccountMapper.toDomain(prismaAccount);

// Domain → Prisma
const prismaData = AccountMapper.toDatabase(domainAccount);
```

### **Actualización parcial**

```typescript
const updateData = {
  name: AccountName.create("Nuevo Nombre"),
  balance: AccountBalance.create(2000.0),
};

const prismaUpdateData = AccountMapper.toDatabaseUpdate(updateData);
```

## 🧪 Testing

### **Casos de prueba estándar**

1. **Conversión exitosa**: Verificar que todos los campos se mapeen correctamente
2. **Campos opcionales**: Manejar `null`/`undefined` apropiadamente
3. **Edge cases**: Valores límite, strings largos, fechas extremas
4. **Conversión inversa**: Verificar que `toDomain` y `toDatabase` sean consistentes

### **Ejemplo de test**

```typescript
describe("AccountMapper", () => {
  it("should convert Prisma Account to Domain Account successfully", () => {
    const result = AccountMapper.toDomain(mockPrismaAccount);

    expect(result.id).toBe(mockPrismaAccount.id);
    expect(result.name.getValue()).toBe(mockPrismaAccount.name);
    expect(result.balance.getValue()).toBe(1000.5);
    // ... más assertions
  });
});
```

## 🔒 Validaciones

### **Validaciones del dominio**

- Los mappers confían en que los value objects del dominio validen los datos
- No se realizan validaciones adicionales en los mappers
- Los errores de validación se propagan desde el dominio

### **Sanitización**

- Conversión de tipos segura (ej: `Number(prismaAccount.balance)`)
- Manejo de valores `null`/`undefined`
- Conversión a tipos de Prisma apropiados

## 📈 Escalabilidad

### **Agregar nuevo mapper**

1. Crear archivo `{entity}-mapper.ts`
2. Implementar métodos `toDomain`, `toDatabase`, `toDatabaseUpdate`
3. Manejar conversiones de tipos específicos
4. Agregar tests completos
5. Exportar en `index.ts`

### **Agregar nuevos campos**

1. Actualizar método `toDomain`
2. Actualizar método `toDatabase`
3. Actualizar método `toDatabaseUpdate` si es necesario
4. Actualizar tests
5. Verificar consistencia con el dominio

## 🚨 Consideraciones

### **Performance**

- Los mappers son síncronos y rápidos
- No realizar operaciones costosas en mappers
- Mantener la lógica simple y directa

### **Mantenibilidad**

- Cada mapper debe ser independiente
- Evitar lógica de negocio en mappers
- Mantener consistencia en el patrón de implementación

### **Testing**

- 100% coverage para mappers
- Tests para casos edge y errores
- Verificar conversiones bidireccionales

## 🔗 Dependencias

- **Domain Layer**: Para entidades y value objects
- **Prisma**: Para tipos de modelos de base de datos
- **Value Objects**: Para validación y encapsulación

## 📝 Convenciones

1. **Nomenclatura**: `{Entity}Mapper` para nombres de clase
2. **Métodos**: Siempre estáticos para facilitar testing
3. **Imports**: Usar paths absolutos cuando sea posible
4. **Documentación**: JSDoc para métodos complejos
5. **Testing**: Un test por método y caso de uso
