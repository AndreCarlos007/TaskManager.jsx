const API_URL = "https://taskmanager-dtfsfagahrcfezdb.brazilsouth-01.azurewebsites.net/api";

function getTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  if (match) return match[2];
  return null;
}

export async function createProject(project) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Erro ao criar projeto:", {
      status: res.status,
      body: text,
    });
    throw new Error(text || "Erro ao criar projeto");
  }

  return JSON.parse(text);
}

export async function getAllProjects() {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Project`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Erro ao buscar projetos:", res.status);
    throw new Error("Erro ao buscar projetos");
  }

  return await res.json();
}

export async function updateProject(id, project) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Project/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Erro ao atualizar projeto:", {
      status: res.status,
      body: text,
    });
    throw new Error(text || "Erro ao atualizar projeto");
  }

  return JSON.parse(text);
}

export async function deleteProject(id) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Project/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Erro ao deletar projeto:", {
      status: res.status,
      body: text,
    });
    throw new Error(text || "Erro ao deletar projeto");
  }

  return { success: true };
}

export async function getProjectById(id) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Project/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Erro ao buscar projeto por ID:", res.status);
    throw new Error("Erro ao buscar projeto");
  }

  return await res.json();
}


