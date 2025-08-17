import { PrismaClient } from "@prisma/client";
import { AuthIntegrationService } from "./auth-integration.service";

export class DatabaseConnectionService {
  private static instance: DatabaseConnectionService;
  private prisma: PrismaClient;
  private authIntegration: AuthIntegrationService;

  private constructor() {
    this.prisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
    this.authIntegration = new AuthIntegrationService(this.prisma);
  }

  public static getInstance(): DatabaseConnectionService {
    if (!DatabaseConnectionService.instance) {
      DatabaseConnectionService.instance = new DatabaseConnectionService();
    }
    return DatabaseConnectionService.instance;
  }

  public getPrismaClient(): PrismaClient {
    return this.prisma;
  }

  public getAuthIntegration(): AuthIntegrationService {
    return this.authIntegration;
  }

  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log("✅ Database connected successfully");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log("✅ Database disconnected successfully");
    } catch (error) {
      console.error("❌ Database disconnection failed:", error);
      throw error;
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error("❌ Database health check failed:", error);
      return false;
    }
  }
}
