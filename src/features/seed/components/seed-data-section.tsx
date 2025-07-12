import { Account } from "@/types/database";

interface SeedDataSectionProps {
  title: string;
  accounts: Account[] | null;
  error: Error | null;
  showUserIds?: boolean;
  variant?: "user" | "all";
}

export function SeedDataSection({
  title,
  accounts,
  error,
  showUserIds = false,
  variant = "user",
}: SeedDataSectionProps) {
  const bgColor = variant === "user" ? "bg-green-50" : "bg-yellow-50";
  const borderColor =
    variant === "user" ? "border-green-500" : "border-yellow-500";

  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {error ? (
        <p className="text-red-600">Error: {error.message}</p>
      ) : accounts && accounts.length > 0 ? (
        <ul className="space-y-2">
          {accounts.map((account) => (
            <li key={account.id} className={`border-l-4 ${borderColor} pl-4`}>
              <p>
                <strong>{account.name}</strong> ({account.type})
              </p>
              <p>Balance: €{account.balance.toLocaleString("es-ES")}</p>
              <p>Provider: {account.provider}</p>
              {showUserIds && (
                <p className="text-xs text-gray-500">
                  User ID: {account.user_id}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-orange-600">
          {variant === "user"
            ? "No hay cuentas para este usuario"
            : "No hay cuentas en la base de datos"}
        </p>
      )}
    </div>
  );
}
