'use client';
import { useState } from "react";
import { loginUser } from "../../app/lib/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log("Token JWT:", response.token);
      localStorage.setItem("token", response.token);
      router.push("/dashboard"); // Corrigido o caminho relativo
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Bem Vindo de Volta!</h2>
          <p className="text-sm text-gray-500">Por favor, entre com suas credenciais para entrar</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:bg-gray-900 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
