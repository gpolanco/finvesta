import Link from "next/link";
import { IconCheck, IconMail } from "@tabler/icons-react";

import { appRoutes } from "@/features/routes";
import { Button } from "@/features/shared/components/ui/button";
import { Card, CardContent } from "@/features/shared/components/ui/card";

interface RegisterSuccessProps {
  email: string;
}

export const RegisterSuccess = ({ email }: RegisterSuccessProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <IconCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Account created!</h2>
          <p className="text-gray-600">We have sent a confirmation link to:</p>
        </div>

        {/* Email Display */}
        <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
          <IconMail className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">{email}</span>
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            Please check your inbox and click the link to activate your account.
          </p>
          <p>If you don&apos;t see the email, check your spam folder.</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href={appRoutes.auth.signIn.path}>Go to login</Link>
          </Button>

          <Button variant="ghost" asChild className="w-full">
            <Link href={appRoutes.dashboard.overview.path}>Go to home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
