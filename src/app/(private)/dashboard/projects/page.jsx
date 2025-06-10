"use client";
import React, { useEffect, useState } from "react";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../../../lib/projects";
import Title from "@/components/ui/Title";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

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

  const toggleStatus = async (project) => {
    // Alterando status: 1 => 0 e 0 => 1
    const updatedProject = {
      ...project,
      status: project.status === 1 ? 0 : 1,
    };

    try {
      const result = await updateProject(project.id, updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? result : p))
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error.message);
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

  return (
    <div>
      <div className="h-full w-[250px] hidden md:block"></div>
      <div className="flex-1 flex flex-col">
        <main className="w-full flex justify-center pb-[11.5rem] mx-auto  px-8 md:pb-0 md:max-w-4xl">
          <div className="flex flex-col">
            <section className="flex flex-col gap-5">
              <div>
                <Title />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold">Projects</h1>
              </div>

              <form
                onSubmit={handleCreate}
                className="flex flex-col gap-3 w-full max-w-md mb-10"
              >
                <input
                  type="text"
                  placeholder="Nome do projeto"
                  className="p-2 rounded bg-zinc-800 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  placeholder="Descrição"
                  className="p-2 rounded bg-zinc-800 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Criar Projeto
                </button>
              </form>

              {loading ? (
                <p className="text-white">Carregando projetos...</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 w-full">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-zinc-900 border border-zinc-700 p-4 rounded shadow"
                    >
                      <h2 className="text-xl font-semibold">{project.name}</h2>
                      <p className="text-sm text-zinc-400 mb-2">
                        {project.description}
                      </p>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => toggleStatus(project)}
                          className={`text-xs px-3 py-1 rounded ${
                            project.status === 1
                              ? "bg-green-600"
                              : "bg-yellow-500"
                          } text-white`}
                        >
                          {project.status === 1 ? "Concluído" : "Pendente"}
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="text-xs px-3 py-1 rounded bg-red-600 text-white"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full place-items-stretch"></div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;
