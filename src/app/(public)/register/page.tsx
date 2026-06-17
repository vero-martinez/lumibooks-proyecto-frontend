import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full bg-background relative overflow-hidden">

            <main className="relative z-10 min-h-screen flex items-center justify-center py-12 px-6">
                <div className="w-full max-w-md p-8 bg-background rounded-2xl shadow-2xl border border-border">
                    <h1 className="text-2xl font-bold text-center mb-2">Crear cuenta</h1>
                    <p className="text-sm text-secondary-foreground text-center mb-6">
                        Completa tus datos para registrarte.
                    </p>
                    <RegisterForm />
                </div>
            </main>
        </div>
    );
}