import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types/database";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("type", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Error al cargar las categorías");
  }

  return categories || [];
}

export async function getCategoriesByType(
  type: "income" | "expense" | "investment"
): Promise<Category[]> {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("type", type)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories by type:", error);
    throw new Error("Error al cargar las categorías");
  }

  return categories || [];
}
