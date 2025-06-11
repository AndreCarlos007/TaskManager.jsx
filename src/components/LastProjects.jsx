"use client";
import React, { useEffect, useState } from "react";
import { getAllProjects } from "../lib/projects";

const LastProjects = () => {
  const [lastProjects, setLastProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        // Ordena por data se disponível, ou usa reverso da ordem original
        const orderedProjects = allProjects
          // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // se tiver createdAt
          .reverse(); // sem createdAt, assume que o último é o mais novo

        setLastProjects(orderedProjects.slice(0, 4));
      } catch (error) {
        console.error("Erro ao buscar projetos recentes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="text-white">Carregando projetos recentes...</p>;

  if (lastProjects.length === 0) return <p className="text-white">Nenhum projeto encontrado.</p>;

  return (
    
    <div className="grid md:grid-cols-2 gap-4 w-[52rem] break-words mb-4">
      {lastProjects.map((project) => (
        <div
          key={project.id}
          className="bg-[#171717] border  border-[#212121] p-4 rounded"
        >
          <h2 className="text-lg font-semibold text-white">{project.name}</h2>
          <p className="text-sm text-zinc-400">{project.description}</p>
          <p className="text-sm text-zinc-500 mt-2">Status: {project.status}</p>
        </div>
      ))}
    </div>
    
  );
};

export default LastProjects;
