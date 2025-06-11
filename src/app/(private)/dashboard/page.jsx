"use client";
import React from "react";
import Link from "next/link";

import Title from "../../../components/ui/Title";
import LastProjects from "@/components/LastProjects";

const page = () => {
  return (
    <div className="pl-10">
      <div className="h-full w-[250px] hidden md:block"></div>
      <div className="flex-1 flex flex-col">
        <main className="w-full flex justify-center pb-[11.5rem] mx-auto  px-8 md:pb-0 md:max-w-4xl">
          <div className="flex flex-col">
            <section className="flex flex-col gap-5">
              <div>
                <Title />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold">Releases</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full place-items-stretch">
                <LastProjects />
              </div>

              <span style={{ opacity: 1, transform: "none" }}>
                
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="relative group flex size-full rounded-md p-6 w-full z-10 hover:shadow-xl">
                      <div className="absolute inset-px z-10 rounded-md bg-colorCard  transition-colors"></div>
                      <div className="relative z-30 w-full">
                        <div className="flex flex-col gap-4 h-full">
                          <div className="flex flex-col gap-1">
                            <div className="p-2 rounded-lg bg-[#262626] w-fit">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </div>
                            <div className="flex items-center gap-2 ">
                              <p className="text-lg font-semibold">Projects</p>
                            </div>
                            <p className="text-sm opacity-55">
                              {" "}
                              Click for view my projects
                            </p>
                          </div>
                          <Link href="/dashboard/projects">
                            <button className="inline-flex items-center justify-center cursor-pointer rounded-md text-white/60 hover:text-white font-medium transition-colors  border border-[#212121] hover:bg-colorBorder text-xs px-[8px] py-[6px] gap-2">
                              View my projects
                            </button>
                          </Link>
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
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
