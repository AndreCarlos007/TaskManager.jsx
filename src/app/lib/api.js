const API_URL = "https://taskmanager-dtfsfagahrcfezdb.brazilsouth-01.azurewebsites.net/api";


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