const API_URL = "https://taskmanager-dtfsfagahrcfezdb.brazilsouth-01.azurewebsites.net/api";

function getTokenFromCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  if (match) return match[2];
  return null;
}

export async function createTask(task) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Erro ao criar task:", {
      status: res.status,
      body: text,
    });
    throw new Error(text || "Erro ao criar task");
  }

  return JSON.parse(text);
}

export async function getAllTasks(projectId) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");
  if (!projectId) throw new Error("ProjectId é obrigatório");

  const res = await fetch(`${API_URL}/Task?projectId=${projectId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Erro ao buscar tasks:", res.status);
    throw new Error("Erro ao buscar tasks");
  }

  return await res.json();
}

export async function getTaskById(id) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Task/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Erro ao buscar task por ID:", res.status);
    throw new Error("Erro ao buscar task por ID");
  }

  return await res.json();
}

export async function updateTask(taskId, projectId, updatedTask) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Task/${taskId}?projectId=${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(updatedTask),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Erro ao atualizar task:", {
      status: res.status,
      body: text,
    });
    throw new Error(text || "Erro ao atualizar task");
  }

  return JSON.parse(text);
}

export async function deleteTask(taskId) {
  const token = getTokenFromCookie();
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${API_URL}/Task/${taskId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Erro ao deletar task:", {
      status: res.status,
      body: text,
    });
    throw new Error(text || "Erro ao deletar task");
  }

  return { success: true };
}