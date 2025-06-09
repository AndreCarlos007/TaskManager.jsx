"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { fetchClientUser } from "../lib/api";

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchClientUser();
        setUser(userData);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err.message);
      }
    };

    loadUser();
  }, []);

  return (
    <div>
      <div className="h-full w-[250px] hidden md:block"></div>
      <div
        className="size-full rounded-md hidden md:flex flex-col py-4 px-4 mx-4 mt-4 fixed top-0 h-[calc(100vh-30px)]  min-w-[250px]
        max-w-[250px] gap-4 z-50 bg-[#171717] border border-[#212121]"
      >
        <div className="absolute inset-px z-10 rounded-md bg-[#171717] overflow-y-hidden transition-colors"></div>
        <div className="relative z-30 w-full">
          <div className="flex flex-col overflow-y-auto h-screen pb-16">
            <div className="w-full flex gap-4 items-center">
              <Image
                className="rounded-md"
                src="/image.png"
                alt="Minha foto de perfil"
                width={40}
                height={40}
                loading="lazy"
              />

              <div className="flex flex-col">
                <p className="font-semibold whitespace-nowrap">
                  {user?.name || "Carregando..."}
                </p>
              </div>
              <div></div>
            </div>

            <div className="flex flex-col gap-2 mt-4 ">
              <Link href="/dashboard" passHref>
                <div
                  className={`flex items-center p-2 gap-2 rounded-md hover:opacity-100 hover:bg-[#121212] transition-all duration-300 delay-75 hover:border-[#212121]
                    ${
                      isActive("/dashboard")
                        ? "bg-[#121212] opacity-100 border border-[#212121]"
                        : "opacity-40 border border-transparent"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M2 2h5v11H2zm6 0h5v5H8zm6 0h4v16h-4zM8 8h5v5H8zm-6 6h11v4H2z"
                    />
                  </svg>

                  <p className="text-sm">DASHBOARD</p>
                </div>
              </Link>

              <Link href="/dashboard/projects" passHref>
                <div
                  className={`flex items-center p-2 gap-2 rounded-md hover:opacity-100 hover:bg-[#121212] transition-all duration-300 delay-75 hover:border-[#212121]
                    ${
                      isActive("/dashboard/projects")
                        ? "bg-[#121212] opacity-100 border border-[#212121]"
                        : "opacity-40 border border-transparent"
                    }`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>

                  <p className="text-sm">PROJECTS</p>
                </div>
              </Link>

              <Link href="/profile" passHref>
                <div
                  className={`flex items-center p-2 gap-2 rounded-md hover:opacity-100 hover:bg-[#121212] transition-all duration-300 delay-75 hover:border-[#212121]
                  ${
                    isActive("/profile")
                      ? "bg-[#121212] opacity-100 border border-[#212121]"
                      : "opacity-40 border border-transparent"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/></svg>

                  <p className="text-sm">PROFILE</p>
                </div>
              </Link>

              {/* <Link href="/about-me" passHref>
                <div
                  className={`flex items-center p-2 gap-2 rounded-md hover:opacity-100 hover:bg-background transition-all duration-300 delay-75 hover:border-colorBorder
                  ${isActive("/about-me") ? "bg-background opacity-100 border border-[#212121]" : "opacity-40 border border-transparent"}`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                  </svg>
                  <p className="text-sm">USER</p>
                </div>
              </Link> */}
            </div>

            {/* outro conteudo */}
          </div>
        </div>
      </div>
      <div
        className="gap-1 pt-2 max-w-[100vw] w-full fixed  bottom-0 left-0 right-0 bg-[#171717] border-[#212121]
      md:hidden z-50 "
      >
        <div className="grid grid-cols-5 justify-items-center mx-1 sm:mx-0 ">
          <Link href="/dashboard">
            <button
              className={`flex-col h-full w-[4rem] p-3 rounded-md flex items-center justify-center transition-colors
        ${isActive("/dashboard") ? "bg-[#121212]" : "bg-none"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M2 2h5v11H2zm6 0h5v5H8zm6 0h4v16h-4zM8 8h5v5H8zm-6 6h11v4H2z"
                />
              </svg>
              <p className="text-[0.7rem] hidden sm:block opacity-100">
                dashboard
              </p>
            </button>
          </Link>

          <Link href="/dashboard/projects">
            <button
              className={`flex-col h-full w-[4rem] p-3 rounded-md flex items-center justify-center transition-colors
        ${isActive("/dashboard/projects") ? "bg-[#121212]" : "bg-none"}`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
              <p className="text-[0.7rem] hidden sm:block opacity-100">
                Projects
              </p>
            </button>
          </Link>

          <Link href="/dashboard/tasks">
            <button
              className={`flex-col h-full w-[4rem] p-3 rounded-md flex items-center justify-center transition-colors
        ${isActive("/dashboard/projects/tasks") ? "bg-[#121212]" : "bg-none"}`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"></path>
                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z"></path>
              </svg>
              <p className="text-[0.7rem] hidden sm:block opacity-100">tasks</p>
            </button>
          </Link>

          <Link href="/user">
            <button
              className={`flex-col h-full w-[4rem] p-3 rounded-md flex items-center justify-center transition-colors
        ${isActive("/user") ? "bg-[#121212]" : "bg-none"}`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
              <p className="text-[0.7rem] hidden sm:block opacity-100">user</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
