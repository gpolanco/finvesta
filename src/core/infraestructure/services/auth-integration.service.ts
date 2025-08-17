import { PrismaClient } from "@prisma/client";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export class AuthIntegrationService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Sincroniza un usuario de Supabase con Prisma
   * Crea o actualiza el perfil del usuario en la base de datos local
   */
  async syncUserWithPrisma(supabaseUser: User): Promise<void> {
    try {
      // Verificar si el usuario ya existe en Prisma
      const existingUser = await this.prisma.user.findUnique({
        where: { id: supabaseUser.id },
        include: { profile: true },
      });

      if (!existingUser) {
        // Crear nuevo usuario en Prisma
        await this.prisma.user.create({
          data: {
            id: supabaseUser.id,
            email: supabaseUser.email!,
            name:
              supabaseUser.user_metadata?.full_name ||
              supabaseUser.user_metadata?.name,
            avatarUrl: supabaseUser.user_metadata?.avatar_url,
            profile: {
              create: {
                id: supabaseUser.id, // Usar el mismo ID para el perfil
                monthlyIncome: 3730.0,
                monthlySavingsTarget: 1500.0,
                maxCryptoPercentage: 15.0,
                maxLiquidNoReturn: 20000.0,
              },
            },
          },
        });
        console.log(`✅ Usuario sincronizado: ${supabaseUser.email}`);
      } else {
        // Actualizar usuario existente
        await this.prisma.user.update({
          where: { id: supabaseUser.id },
          data: {
            email: supabaseUser.email!,
            name:
              supabaseUser.user_metadata?.full_name ||
              supabaseUser.user_metadata?.name,
            avatarUrl: supabaseUser.user_metadata?.avatar_url,
            updatedAt: new Date(),
          },
        });
        console.log(`✅ Usuario actualizado: ${supabaseUser.email}`);
      }
    } catch (error) {
      console.error("❌ Error sincronizando usuario:", error);
      throw new Error(`Error sincronizando usuario: ${error}`);
    }
  }

  /**
   * Obtiene el usuario de Prisma basado en el ID de Supabase
   */
  async getPrismaUser(supabaseUserId: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id: supabaseUserId },
        include: { profile: true },
      });
    } catch (error) {
      console.error("❌ Error obteniendo usuario de Prisma:", error);
      throw new Error(`Error obteniendo usuario de Prisma: ${error}`);
    }
  }

  /**
   * Verifica si un usuario existe en Prisma
   */
  async userExistsInPrisma(supabaseUserId: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: supabaseUserId },
        select: { id: true },
      });
      return !!user;
    } catch (error) {
      console.error("❌ Error verificando existencia de usuario:", error);
      return false;
    }
  }

  /**
   * Sincroniza todos los usuarios de Supabase con Prisma
   * Útil para migración inicial
   */
  async syncAllUsers(): Promise<void> {
    try {
      const supabase = await createClient();
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();

      if (error) {
        throw new Error(
          `Error obteniendo usuarios de Supabase: ${error.message}`
        );
      }

      console.log(`🔄 Sincronizando ${users.length} usuarios...`);

      for (const user of users) {
        await this.syncUserWithPrisma(user);
      }

      console.log("✅ Todos los usuarios sincronizados");
    } catch (error) {
      console.error("❌ Error en sincronización masiva:", error);
      throw new Error(`Error en sincronización masiva: ${error}`);
    }
  }
}
