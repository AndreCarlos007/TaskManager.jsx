const API_URL = "https://taskmanager-dtfsfagahrcfezdb.brazilsouth-01.azurewebsites.net/api";

// Registro de novo usuário
export async function registerUser(name, email, password) {
  const res = await fetch(`${API_URL}/Users/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao registrar");
  }

  return await res.json();
}

// Login de usuário
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/Users/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Falha no login");
  }

  return await res.json(); 
}

// Obter perfil diretamente da API externa usando token (servidor)
export async function getUserProfile(token) {
  const res = await fetch(`${API_URL}/Users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar perfil");
  }

  return await res.json();
}

// ✅ Obter perfil no CLIENT via rota interna que já acessa os cookies
export async function fetchClientUser() {
  const res = await fetch("/api/auth/user", {
    method: "GET",
    credentials: "include", // garante envio dos cookies
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao obter dados do usuário");
  }

  return await res.json();
}
