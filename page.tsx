import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Entrar no ScaleConnect</h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Sua senha"
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-4">
          Não tem conta?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
