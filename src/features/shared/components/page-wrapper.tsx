import { cn } from "@/features/shared/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
}

export function PageWrapper({
  children,
  title,
  description,
  className,
  actions,
}: PageWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center">
        <div className="flex flex-col">
          {title && <h1 className={"text-2xl font-bold"}>{title}</h1>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex ml-auto">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
