import { LoginForm } from "@/features/auth/components/LoginForm";
import { SunnyBackground } from "@/components/shared/sunny-background/SunnyBackground";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <SunnyBackground />

      <main className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-border">
          <h1 className="text-2xl font-bold text-center mb-2">Iniciar sesión</h1>
          <p className="text-sm text-secondary-foreground text-center mb-6">
            Si tienes una cuenta, inicia sesión aquí.
          </p>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}