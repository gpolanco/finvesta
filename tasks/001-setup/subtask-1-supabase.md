# 001-1: Setup Supabase y Variables de Entorno

**⏱️ Estimación**: 30-45 minutos  
**🎯 Objetivo**: Tener Supabase conectado y funcionando con el proyecto

## 📋 Pasos Específicos

### 1. Crear Proyecto Supabase (10 min)

```bash
# 1. Ir a https://supabase.com/dashboard
# 2. Crear nuevo proyecto
#    - Nombre: "finvesta"
#    - Password: [generar una segura]
#    - Región: Europe (Frankfurt) para menor latencia
# 3. Esperar a que termine setup (2-3 min)
```

### 2. Obtener Credentials (5 min)

```bash
# En Supabase Dashboard:
# Settings → API → Project Settings
# Copiar:
# - Project URL
# - anon (public) key
# - service_role key (para migrations futuras)
```

### 3. Configurar Variables de Entorno (10 min)

```bash
# Crear .env.local en root del proyecto
touch .env.local
```

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

```bash
# Agregar a .gitignore si no está
echo ".env.local" >> .gitignore
```

### 4. Instalar Cliente Supabase (5 min)

```bash
npm install @supabase/supabase-js
```

### 5. Crear Cliente Supabase (10 min)

```typescript
// src/lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

```typescript
// src/lib/supabase/server.ts - Para Server Components
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
```

### 6. Test de Conexión (5 min)

```typescript
// src/app/test-supabase/page.tsx - Página temporal para testing
"use client";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function TestSupabase() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from("test")
          .select("*")
          .limit(1);
        if (error && error.code === "PGRST116") {
          setStatus("✅ Connected! (Table not found is expected)");
        } else {
          setStatus("✅ Connected!");
        }
      } catch (err) {
        setStatus("❌ Connection failed");
        console.error(err);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-8">
      <h1>Supabase Connection Test</h1>
      <p>{status}</p>
    </div>
  );
}
```

## ✅ Criterios de Éxito

- [x] Proyecto Supabase creado y configurado
- [x] Variables de entorno en `.env.local` funcionando
- [x] Cliente Supabase instalado y exportado
- [x] Página de test muestra "Connected!"
- [x] No hay errores en consola de Next.js

## 🧪 Testing

```bash
# 1. Verificar que Next.js arranca sin errores
npm run dev

# 2. Ir a http://localhost:3000/test-supabase
# 3. Debe mostrar "✅ Connected!"

# 3. Verificar variables de entorno
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL ? 'ENV OK' : 'ENV MISSING')"
```

## 🔄 Troubleshooting

### Error: "Invalid API URL or key"

```bash
# Verificar que las variables estén bien copiadas
cat .env.local | grep SUPABASE
```

### Error: Next.js no encuentra variables

```bash
# Reiniciar servidor de desarrollo
npm run dev
```

## 📝 Commit

```bash
git add .
git commit -m "feat(setup): configure Supabase client and environment

- Create Supabase project for Finvesta app
- Add environment variables for connection
- Install @supabase/supabase-js client
- Create client and server Supabase instances
- Add connection test page

Refs: tasks/001-setup/subtask-1-supabase.md"
```

## 🎯 Próximo Paso

✅ **Completado** → 👉 **[Continuar con subtask-2-shadcn.md](./subtask-2-shadcn.md)**

## 📋 Actualizar Estado

```bash
# Actualizar tasks/current-task.md:
# - Estado: ✅ Completado
# - Próximo subtask: 001-2 Shadcn/UI Setup
```
