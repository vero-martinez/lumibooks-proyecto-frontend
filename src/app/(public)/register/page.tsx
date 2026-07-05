import { CardLayout } from "@/components/shared/CardLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-12">
      <CardLayout title="Crear cuenta" subtitle="Completa tus datos para registrarte.">
        <RegisterForm />
      </CardLayout>
    </div>
  );
}