import { createClient } from "@/lib/supabase/server";
import { migrateSeedDataToCurrentUser } from "@/features/seed/actions/migrate-seed-data";
import { SeedDataSection } from "@/features/seed/components/seed-data-section";
import { redirect } from "next/navigation";

async function handleMigration() {
  "use server";
  try {
    const result = await migrateSeedDataToCurrentUser();
    console.log("Migration result:", result);
    // Redirigir a la misma página para mostrar los cambios
    redirect("/seed");
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
}

export default async function SeedPage() {
  const supabase = await createClient();

  // Obtener el usuario autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">
          Seed Data - Usuario no autenticado
        </h1>
        <p>Error: {authError?.message || "No user found"}</p>
      </div>
    );
  }

  // Verificar cuentas del usuario autenticado
  const { data: accounts, error: accountsError } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id);

  // Verificar todas las cuentas en la base de datos
  const { data: allAccounts, error: allAccountsError } = await supabase
    .from("accounts")
    .select("*");

  // Verificar si el usuario tiene perfil
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-8 space-y-6">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          🌱 Seed Data Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Herramientas de desarrollo para generar datos de ejemplo en Finvesta
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Solo para desarrollo:</strong> Esta página no debe estar
            disponible en producción
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">👤 Usuario Autenticado</h2>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Created:</strong> {user.created_at}
        </p>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">📋 Perfil del Usuario</h2>
        {profileError ? (
          <p className="text-red-600">
            ❌ No existe perfil: {profileError.message}
          </p>
        ) : profile ? (
          <div className="space-y-1">
            <p>
              <strong>Nombre:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Ingreso mensual:</strong> €{profile.monthly_income}
            </p>
            <p>
              <strong>Objetivo ahorro:</strong> €
              {profile.monthly_savings_target}
            </p>
            <p className="text-green-600">✅ Perfil existe correctamente</p>
          </div>
        ) : (
          <p className="text-orange-600">⚠️ Perfil no encontrado</p>
        )}
      </div>

      <SeedDataSection
        title="💰 Cuentas del Usuario Actual"
        accounts={accounts}
        error={accountsError}
        variant="user"
      />

      <SeedDataSection
        title="🗄️ Todas las Cuentas en la BD"
        accounts={allAccounts}
        error={allAccountsError}
        variant="all"
        showUserIds={true}
      />

      <div className="bg-purple-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">🎯 Acciones de Seed</h2>
        <p className="text-sm text-gray-600 mb-4">
          Genera datos de ejemplo basados en el contexto financiero de Finvesta
        </p>

        <div className="space-y-3">
          <div>
            <p>
              <strong>Usuario Demo del Seed:</strong>
            </p>
            <p className="text-sm text-gray-600">
              ID: 00000000-0000-0000-0000-000000000001
            </p>
            <p className="text-sm text-gray-600">Email: demo@finvesta.dev</p>
            <p
              className={
                user.id === "00000000-0000-0000-0000-000000000001"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {user.id === "00000000-0000-0000-0000-000000000001"
                ? "✅ Coincide con el usuario del seed"
                : "❌ No coincide con el usuario del seed"}
            </p>
          </div>

          {(!accounts || accounts.length === 0) && (
            <div className="bg-white p-4 rounded border border-purple-200">
              <form action={handleMigration}>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
                >
                  🌱 Crear Datos de Ejemplo Completos
                </button>
              </form>
              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <strong>Esto creará:</strong>
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>
                    Perfil del usuario con datos financieros (€3.730/mes
                    ingreso, €1.500/mes ahorro)
                  </li>
                  <li>
                    4 cuentas financieras: Sabadell (€12.000), BBVA (€10.000),
                    Binance (€10.000), Fidelity MSCI World (€2.500)
                  </li>
                  <li>
                    Total patrimonio: €34.500 (22% liquidez, 29% cripto, 7%
                    inversión)
                  </li>
                </ul>
              </div>
            </div>
          )}

          {accounts && accounts.length > 0 && (
            <div className="bg-green-100 p-4 rounded border border-green-200">
              <p className="text-green-800 font-medium">
                ✅ Datos de ejemplo ya creados
              </p>
              <p className="text-sm text-green-700 mt-1">
                El usuario ya tiene {accounts.length} cuentas configuradas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
