import { NextResponse } from 'next/server';

const API_URL = "https://taskmanager-dtfsfagahrcfezdb.brazilsouth-01.azurewebsites.net/api";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const res = await fetch(`${API_URL}/Users/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.message || "Falha no login" }, { status: 401 });
    }

    const data = await res.json();
    const token = data.token;

    const response = NextResponse.json({ success: true });

    // Define cookie HttpOnly e seguro (ajuste secure: true em produção HTTPS)
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
