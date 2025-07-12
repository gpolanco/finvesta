import { RegisterForm } from "@/features/auth/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/shared/components/ui/card";
import Link from "next/link";
import { appRoutes } from "@/features/routes";
import { appConfig } from "@/app-config";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create account
        </CardTitle>
        <CardDescription className="text-center">
          Join {appConfig.name} and start managing your finances
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href={appRoutes.auth.signIn.path}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
