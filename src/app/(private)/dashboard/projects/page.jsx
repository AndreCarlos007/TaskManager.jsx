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

              <div className="flex flex-col gap-6 mt-4 ">
                <div className="relative flex size-full rounded-md p-4 w-full z-10">
                  <div className="absolute inset-px z-10 rounded-md border border-[#212121] bg-[#171717] transition-colors"></div>
                  <div className="relative z-30 w-[700px]">
                    <div className="flex flex-col gap-4 h-full">
                      <div className="flex flex-col gap-1">
                        <div className=" rounded-lg  ">
                          <form
                            onSubmit={handleCreate}
                            className="flex flex-col gap-3 w-full  mb-10"
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
                              resize="none"
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            <button
                              type="submit"
                              className="bg-[#154c0f] hover:bg-[#26651d] text-[#6e6e6e] hover:text-white cursor-pointer transition-all duration-300 font-semibold py-2 px-4 rounded"
                            >
                              Create project
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {loading ? (
                <p className="text-white">Carregando projetos...</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 w-full">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-zinc-900 border border-[#212121] p-4 rounded "
                    >
                      <h2 className="text-xl font-semibold">{project.name}</h2>
                      <p className="text-sm text-zinc-400 mb-2">
                        {project.description}
                      </p>
                      <div className="flex justify-end mt-4">
                        Status = pendente, fazer requisição getById para pegar o status do projeto que retorna
                        <button
                          // fazer onclick para fazer a função de editar titulo, descrição e status do projeto
                          className="bg-[#171717] hover:bg-[#121212] p-1 rounded-[10px] border border-[#212121] cursor-pointer text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m13.948 12.533l-2.327-2.352l4.083-4.077l-.36-.36q-.154-.154-.461-.154t-.462.154L9.877 10.29q-.146.146-.335.146t-.334-.146q-.166-.147-.166-.348t.147-.347l4.557-4.557q.485-.485 1.153-.485t1.153.485l.36.36l.827-.828q.242-.242.568-.242t.568.242l1.267 1.268q.243.242.224.53q-.02.287-.262.53zM4.942 20q-.348 0-.577-.23q-.23-.23-.23-.578v-1.098q0-.207.073-.387t.233-.34l6.448-6.453l2.352 2.327l-6.474 6.453q-.16.16-.339.233T6.041 20z"/></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full place-items-stretch"></div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;
