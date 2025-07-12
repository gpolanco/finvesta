import { Button } from "@/features/shared/components/ui/button";
import { cn } from "@/features/shared/lib/utils";
import { LucideIcon, PiggyBank, Plus } from "lucide-react";
import Link from "next/link";

interface EmptyContentProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  fullHeight?: boolean;
  buttonText?: string;
  createPath?: string;
  buttonIcon?: LucideIcon;
}

export const EmptyContent = ({
  title,
  description,
  icon: IconComponent = PiggyBank,
  fullHeight = true,
  buttonText = "Add account",
  createPath,
  buttonIcon = Plus,
}: EmptyContentProps) => {
  const ButtonIcon = buttonIcon || Plus;

  return (
    <div
      className={cn("flex flex-col items-center justify-center py-16", {
        "h-full": fullHeight,
      })}
      role="status"
    >
      <IconComponent
        className="w-16 h-16 text-gray-400 mb-4"
        aria-hidden="true"
      />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        {description}
      </p>
      {createPath && (
        <Button variant="default" asChild className="mt-4" size="lg">
          <Link title={buttonText} href={createPath}>
            <ButtonIcon className="w-4 h-4" />
            {buttonText}
          </Link>
        </Button>
      )}
    </div>
  );
};
