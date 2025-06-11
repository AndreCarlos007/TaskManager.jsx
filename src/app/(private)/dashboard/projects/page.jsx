"use client";
import React, { useEffect, useState } from "react";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from "../../../../lib/projects";
import Title from "@/components/ui/Title";

import { useRouter } from "next/navigation";

const statusMap = {
  0: "In Progress",
  1: "Completed",
  2: "Canceled",
};

const statusReverseMap = {
  "In Progress": 0,
  Completed: 1,
  Canceled: 2,
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !description) return;

    try {
      const newProject = await createProject({ name, description });
      setProjects((prev) => [...prev, newProject]);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao criar projeto:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao excluir projeto:", error.message);
    }
  };

  const openEditModal = async (id) => {
    try {
      const project = await getProjectById(id);
      setEditingProject(project);
      setEditName(project.name);
      setEditDescription(project.description);
      setEditStatus(""); // deixa o select inicialmente vazio
    } catch (error) {
      console.error("Erro ao buscar projeto:", error.message);
    }
  };

  const handleUpdate = async () => {
    if (!editName || !editDescription) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    const statusText = editStatus || "In Progress";
    const status = statusReverseMap[statusText];

    try {
      const updated = {
        name: editName,
        description: editDescription,
        status,
      };

      const result = await updateProject(editingProject.id, updated);
      const resultWithStatusText = {
        ...result,
        status: statusMap[result.status] || "In Progress",
      };
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? resultWithStatusText : p))
      );
      setEditingProject(null);
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error.message);
    }
  };

  return (
    <div>
      {/* Modal de edição */}
      {editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-zinc-900 border border-[#212121] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Project</h2>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nome"
              className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descrição"
              className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
            />
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full mb-4 p-2 rounded bg-zinc-800 text-white"
            >
              <option value="">Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProject(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="h-full w-[250px] hidden md:block"></div>
      <div className="flex-1 flex flex-col">
        <main className="w-full flex justify-center pb-[11.5rem] mx-auto px-8 md:pb-0 md:max-w-4xl">
          <div className="flex flex-col">
            <section className="flex flex-col gap-5">
              <Title />
              <h1 className="text-2xl font-extrabold">Projects</h1>

              <form
                onSubmit={handleCreate}
                className="flex flex-col gap-3 w-full mb-10"
              >
                <input
                  type="text"
                  placeholder="Project name"
                  className="p-2 rounded bg-zinc-800 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  className="p-2 rounded bg-zinc-800 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#154c0f] hover:bg-[#26651d] text-[#6e6e6e] cursor-pointer hover:text-white transition-all font-semibold py-2 px-4 rounded"
                >
                  Create project
                </button>
              </form>

              {loading ? (
                <p className="text-white">Carregando projetos...</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 w-[780px] break-words mb-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() =>
                        router.push(`/dashboard/projects/tasks/${project.id}`)
                      }
                      className="bg-[#171717] border border-[#212121] p-4 rounded cursor-pointer hover:bg-[#1f1f1f] transition"
                    >
                      <h2 className="text-xl font-semibold">{project.name}</h2>
                      <p className="text-sm text-zinc-400">
                        {project.description}
                      </p>
                      <p className="text-sm text-zinc-500 mt-2">
                        Status: {project.status}
                      </p>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(project.id);
                          }}
                          className="bg-[#171717]  hover:bg-[#121212] p-1 rounded-[10px] border border-[#212121] cursor-pointer text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m13.948 12.533l-2.327-2.352l4.083-4.077l-.36-.36q-.154-.154-.461-.154t-.462.154L9.877 10.29q-.146.146-.335.146t-.334-.146q-.166-.147-.166-.348t.147-.347l4.557-4.557q.485-.485 1.153-.485t1.153.485l.36.36l.827-.828q.242-.242.568-.242t.568.242l1.267 1.268q.243.242.224.53q-.02.287-.262.53zM4.942 20q-.348 0-.577-.23q-.23-.23-.23-.578v-1.098q0-.207.073-.387t.233-.34l6.448-6.453l2.352 2.327l-6.474 6.453q-.16.16-.339.233T6.041 20z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(project.id);
                          }}
                          className="bg-[#171717] hover:bg-[#121212] p-1 rounded-[10px] border border-[#212121] cursor-pointer text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;
