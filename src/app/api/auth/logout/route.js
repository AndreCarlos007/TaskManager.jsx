import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const expiredCookie = `token=; Path=/; Expires=${new Date(0).toUTCString()}; HttpOnly; Secure; SameSite=Strict`;
    
    return new NextResponse(JSON.stringify({ message: 'Logout realizado' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': expiredCookie
      }
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Erro ao fazer logout' }),
      { status: 500 }
    );
  }
}