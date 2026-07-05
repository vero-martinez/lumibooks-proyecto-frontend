import { CardLayout } from "@/components/shared/CardLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-12">
      <CardLayout title="Iniciar sesión" subtitle="Si tienes una cuenta, inicia sesión aquí.">
        <LoginForm />
      </CardLayout>
    </div>
  );
}