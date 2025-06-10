"use client";
import React, { useEffect, useState } from "react";
import { fetchClientUser } from "../../../lib/api"; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchClientUser();
        setUser(userData);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <div>
      <div className="h-full w-[250px] hidden md:block"></div>
      <div className="flex-1 flex flex-col">
        <main className="w-full flex justify-center pb-[11.5rem] mx-auto px-8 md:pb-0 md:max-w-4xl">
          <div className="flex flex-col">
            <section className="flex flex-col gap-5">
              {/* Título */}
              <span style={{ opacity: 1, transform: "none" }}>
                <div className="flex flex-col gap-6 mt-4">
                  <div className="relative flex size-full rounded-md p-4 w-full z-10">
                    <div className="absolute inset-px z-10 rounded-md bg-[#171717] transition-colors"></div>
                    <div className="relative z-30 w-[750px]">
                      <div className="flex flex-col gap-4 h-full">
                        <div className="flex flex-col gap-1">
                          <div className="rounded-lg">
                            <h1 className="text-3xl font-extrabold">TASK MANAGER</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="pointer-events-none absolute inset-px z-10 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block"
                      style={{ opacity: 0.7 }}
                    ></div>
                    <div className="pointer-events-none absolute inset-0 rounded-md bg-[#171717] border border-[#212121] duration-300 group-hover:opacity-100 hidden md:block"></div>
                  </div>
                </div>
              </span>

              <div>
              <h1 className="text-2xl font-extrabold">Profile</h1>
            </div>

              {/* Seção de Perfil */}
              <div className="relative flex flex-col md:flex-row items-center gap-6 rounded-md p-6 w-full z-10 bg-[#171717] border border-[#212121] min-h-[200px]">
                {loading ? (
                  <p className="text-white">Carregando dados do usuário...</p>
                ) : user ? (
                  <>
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#212121] shadow-lg">
                      <img
                        src="/image.png"
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-sm md:text-base">
                      <div>
                        <span className="text-zinc-400">Nome completo:</span>
                        <p className="text-white font-semibold">{user.name}</p>
                      </div>
                      <div>
                        <span className="text-zinc-400">ID:</span>
                        <p className="text-white font-medium">{user.id}</p>
                      </div>
                      <div>
                        <span className="text-zinc-400">Email:</span>
                        <p className="text-white font-medium">{user.email}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-red-500">Erro ao carregar o perfil do usuário.</p>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
