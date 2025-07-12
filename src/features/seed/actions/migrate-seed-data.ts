import { createClient } from "@/lib/supabase/server";

export async function migrateSeedDataToCurrentUser() {
  const supabase = await createClient();

  // Obtener el usuario autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  // Verificar si el usuario ya tiene un perfil
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  // Si no existe el perfil, crearlo
  if (!existingProfile) {
    console.log("Creating profile for user:", user.id);
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      name: user.user_metadata?.name || user.email || "Usuario",
      email: user.email || "",
      monthly_income: 3730.0,
      monthly_savings_target: 1500.0,
      max_crypto_percentage: 15.0,
      max_liquid_no_return: 20000.0,
    });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      throw new Error(`Error creating user profile: ${profileError.message}`);
    }
    console.log("Profile created successfully");
  } else {
    console.log("Profile already exists for user:", user.id);
  }

  // Verificar si el usuario ya tiene cuentas
  const { data: existingAccounts } = await supabase
    .from("accounts")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);

  if (existingAccounts && existingAccounts.length > 0) {
    return { message: "User already has accounts, no migration needed" };
  }

  // Crear las cuentas de ejemplo para el usuario actual
  const accountsToInsert = [
    {
      user_id: user.id,
      name: "Sabadell",
      type: "bank" as const,
      provider: "Sabadell",
      balance: 12000.0,
      currency: "EUR",
      is_active: true,
    },
    {
      user_id: user.id,
      name: "BBVA",
      type: "bank" as const,
      provider: "BBVA",
      balance: 10000.0,
      currency: "EUR",
      is_active: true,
    },
    {
      user_id: user.id,
      name: "Binance",
      type: "crypto" as const,
      provider: "Binance",
      balance: 10000.0,
      currency: "EUR",
      is_active: true,
    },
    {
      user_id: user.id,
      name: "Fidelity MSCI World",
      type: "investment" as const,
      provider: "MyInvestor",
      balance: 2500.0,
      currency: "EUR",
      is_active: true,
    },
  ];

  const { data: insertedAccounts, error: insertError } = await supabase
    .from("accounts")
    .insert(accountsToInsert)
    .select();

  if (insertError) {
    console.error("Error inserting accounts:", insertError);
    console.error(
      "Insert error details:",
      JSON.stringify(insertError, null, 2)
    );
    throw new Error(
      `Error creating seed accounts for user: ${insertError.message}`
    );
  }

  console.log("Successfully created accounts:", insertedAccounts);
  return {
    message: "Seed accounts created successfully",
    accounts: insertedAccounts,
  };
}
