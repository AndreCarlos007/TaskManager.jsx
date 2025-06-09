'use client';
import { useState } from "react";
import { loginUser } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const token = response.token;

      
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#121212] flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-3xl font-semibold text-center mb-6">Task Manager</h1>
      <div className="bg-[#171717] p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-[#737373] block mb-1">EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="carlos@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#262626] text-white placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#737373] block mb-1">PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#262626] text-white placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-white text-[#212121] font-semibold rounded-full hover:bg-gray-200 transition">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}
