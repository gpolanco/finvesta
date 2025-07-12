import {
  Card,
  CardHeader,
  CardContent,
} from "@/features/shared/components/ui/card";
import { Skeleton } from "@/features/shared/components/ui/skeleton";

export function AccountSkeleton() {
  return (
    <Card
      className="flex flex-col h-full"
      role="status"
      aria-label="Cargando cuenta"
    >
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Skeleton className="w-5 h-5 rounded" />
        <div className="flex-1">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end pt-0">
        <Skeleton className="h-8 w-32 mb-1" />
        <Skeleton className="h-3 w-8" />
      </CardContent>
    </Card>
  );
}

export function AccountListSkeleton() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Cargando cuentas"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <AccountSkeleton key={i} />
      ))}
    </div>
  );
}
