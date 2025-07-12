import { cn } from "@/features/shared/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function PageWrapper({
  children,
  title,
  description,
  className,
}: PageWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col">
        {title && <h1 className={"text-2xl font-bold"}>{title}</h1>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
