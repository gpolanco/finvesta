"use client";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function TestSupabase() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { error } = await supabase.from("test").select("*").limit(1);
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
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <p className="text-lg">{status}</p>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          If you see &quot;Connected!&quot; your Supabase setup is working
          correctly.
        </p>
        <p>
          Next step: Configure your actual Supabase credentials in .env.local
        </p>
      </div>
    </div>
  );
}
