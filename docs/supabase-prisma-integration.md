# 🔗 Integración Supabase + Prisma - Documentación Técnica

## 📋 **RESUMEN EJECUTIVO**

Esta implementación utiliza un enfoque **HÍBRIDO** donde:

- **Supabase**: Maneja autenticación, RLS y funciones de base de datos
- **Prisma**: Proporciona ORM, validaciones y tipado fuerte
- **Sincronización**: Los usuarios de Supabase se sincronizan automáticamente con Prisma

## 🏗️ **ARQUITECTURA IMPLEMENTADA**

### **1. Capa de Autenticación (Supabase)**

```typescript
// src/lib/supabase/server.ts
export async function createClient() {
  // Cliente de servidor para autenticación
}

// src/features/auth/lib/get-user-server.ts
export async function getUserServer(): Promise<User | null> {
  // Obtiene usuario autenticado de Supabase
}
```

### **2. Capa de Base de Datos (Prisma)**

```typescript
// prisma/schema.prisma
model User {
  id        String   @id @db.Uuid
  email     String   @unique
  // ... otros campos
  @@map("users") // Tabla local de Prisma
}

model Account {
  id     String @id @default(cuid())
  userId String @db.Uuid @map("user_id")
  // ... otros campos
  user   User   @relation(fields: [userId], references: [id])
}
```

### **3. Servicio de Integración**

```typescript
// src/core/infraestructure/services/auth-integration.service.ts
export class AuthIntegrationService {
  async syncUserWithPrisma(supabaseUser: User): Promise<void>;
  async getPrismaUser(supabaseUserId: string);
  async userExistsInPrisma(supabaseUserId: string): Promise<boolean>;
}
```

## 🚀 **PASOS DE IMPLEMENTACIÓN**

### **Paso 1: Configurar Variables de Entorno**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

DATABASE_URL=postgresql://postgres:[PASSWORD]@aws-1-eu-central-1.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@aws-1-eu-central-1.supabase.co:5432/postgres
```

### **Paso 2: Ejecutar Migración de Base de Datos**

```bash
# 1. Crear migración inicial
pnpm db:migrate

# 2. Regenerar el cliente de Prisma
pnpm db:generate

# 3. Verificar la conexión
pnpm db:studio
```

### **Paso 3: Sincronizar Usuarios Existentes**

```typescript
// En un script de migración o comando
import { DatabaseConnectionService } from "@/core/infraestructure/services/database-connection.service";

const dbService = DatabaseConnectionService.getInstance();
await dbService.getAuthIntegration().syncAllUsers();
```

## 🔄 **FLUJO DE AUTENTICACIÓN**

```mermaid
sequenceDiagram
    participant Client
    participant Supabase
    participant Prisma
    participant DB

    Client->>Supabase: Login
    Supabase->>Client: JWT Token
    Client->>Supabase: API Request
    Supabase->>Prisma: Get User Data
    Prisma->>DB: Query with userId
    DB->>Prisma: User Data
    Prisma->>Supabase: Formatted Data
    Supabase->>Client: Response
```

## 📊 **VENTAJAS DE ESTA IMPLEMENTACIÓN**

### **✅ Beneficios**

1. **Autenticación Robusta**: Supabase maneja auth, RLS y seguridad
2. **ORM Potente**: Prisma proporciona tipado fuerte y validaciones
3. **Escalabilidad**: Separación clara de responsabilidades
4. **Migración Gradual**: Puedes migrar gradualmente de Supabase a Prisma
5. **RLS Mantenido**: Las políticas de seguridad de Supabase siguen funcionando

### **⚠️ Consideraciones**

1. **Sincronización**: Los usuarios deben sincronizarse entre ambos sistemas
2. **Doble Cliente**: Mantienes clientes de Supabase y Prisma
3. **Migración de Datos**: Los datos existentes necesitan `user_id`

## 🛠️ **USO EN COMPONENTES**

### **Ejemplo: Crear Cuenta**

```typescript
// src/features/accounts/actions/create-account-action.ts
import { getUserServer } from "@/features/auth/lib/get-user-server";
import { DatabaseConnectionService } from "@/core/infraestructure/services/database-connection.service";

export async function createAccountAction(formData: FormData) {
  const user = await getUserServer();
  if (!user) throw new Error("Usuario no autenticado");

  const dbService = DatabaseConnectionService.getInstance();
  const accountRepo = new AccountRepository(dbService.getPrismaClient());

  const account = await accountRepo.create({
    ...accountData,
    userId: user.id, // ✅ Incluir userId en todas las operaciones
  });

  return account;
}
```

### **Ejemplo: Obtener Cuentas del Usuario**

```typescript
// src/features/accounts/actions/get-accounts.ts
export async function getAccountsAction() {
  const user = await getUserServer();
  if (!user) return [];

  const dbService = DatabaseConnectionService.getInstance();
  const accountRepo = new AccountRepository(dbService.getPrismaClient());

  return await accountRepo.findAll(user.id); // ✅ Filtrar por userId
}
```

## 🔧 **MANTENIMIENTO**

### **Sincronización Automática de Usuarios**

```typescript
// En tu middleware o hook de autenticación
useEffect(() => {
  if (user) {
    // Sincronizar usuario con Prisma
    dbService.getAuthIntegration().syncUserWithPrisma(user);
  }
}, [user]);
```

### **Verificación de Consistencia**

```typescript
// Script de mantenimiento
async function verifyDataConsistency() {
  const supabaseUsers = await getSupabaseUsers();
  const prismaUsers = await getPrismaUsers();

  // Verificar que todos los usuarios de Supabase estén en Prisma
  for (const supabaseUser of supabaseUsers) {
    if (!(await userExistsInPrisma(supabaseUser.id))) {
      await syncUserWithPrisma(supabaseUser);
    }
  }
}
```

## 🚨 **SOLUCIÓN DE PROBLEMAS**

### **Error: "Column user_id does not exist"**

```bash
# Ejecutar migración
pnpm db:migrate
```

### **Error: "User not found in Prisma"**

```typescript
// Verificar sincronización
const exists = await dbService.getAuthIntegration().userExistsInPrisma(userId);
if (!exists) {
  await dbService.getAuthIntegration().syncUserWithPrisma(supabaseUser);
}
```

### **Error: "Prisma schema out of sync"**

```bash
# Regenerar cliente de Prisma
pnpm db:generate

# Verificar conexión
pnpm db:studio
```

## 📈 **PRÓXIMOS PASOS**

1. **Implementar sincronización automática** en el middleware de autenticación
2. **Migrar repositorios restantes** (Category, Transaction) al nuevo patrón
3. **Agregar tests** para la integración
4. **Implementar cache** para evitar consultas repetidas
5. **Monitoreo** de la sincronización de usuarios

## 🎯 **CONCLUSIÓN**

Esta implementación híbrida te permite:

- **Mantener** la robustez de Supabase para autenticación
- **Aprovechar** el poder de Prisma para ORM y validaciones
- **Escalar** gradualmente sin reescribir todo el sistema
- **Mantener** la seguridad RLS de Supabase

La clave está en la **sincronización automática** de usuarios y el **filtrado consistente** por `userId` en todas las operaciones de Prisma.

---

**📚 Documentación relacionada:**

- **AI Project Overview**: Visión general del proyecto y estado actual
- **RLS Implementation Pending**: Documentación para implementar seguridad adicional

**⚠️ NOTA**: Este documento es técnico y está dirigido a desarrolladores. Para información general del proyecto, consulta "AI Project Overview".
