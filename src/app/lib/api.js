const API_URL = "https://taskmanager-dtfsfagahrcfezdb.brazilsouth-01.azurewebsites.net/";


export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Falha no login");
  return await res.json(); 
}

export async function registerUser(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error("Falha no cadastro");
  return await res.json(); 
}