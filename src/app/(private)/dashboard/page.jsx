"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className="h-full w-[250px] hidden md:block"></div>
      <div className="flex-1 flex flex-col">
        <main className="w-full flex justify-center pb-[11.5rem] mx-auto  px-8 md:pb-0 md:max-w-4xl">
          <div className="flex flex-col">

            <section className="flex flex-col gap-5">

                <span style={{ opacity: 1, transform: "none" }}>
                  <div className="flex flex-col gap-6 mt-4 ">
                    <div className="relative flex size-full rounded-md p-4 w-full z-10">
                      <div className="absolute inset-px z-10 rounded-md bg-[#171717] transition-colors"></div>
                      <div className="relative z-30 w-[700px]">
                        <div className="flex flex-col gap-4 h-full">
                          <div className="flex flex-col gap-1">
                            <div className=" rounded-lg  ">
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
              <h1 className="text-2xl font-extrabold">Releases</h1>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full place-items-stretch">

                <span style={{ opacity: 1, transform: "none" }}>
  <div className="group relative flex w-96 h-32 rounded-md cursor-pointer z-10">
    <div className="absolute inset-px z-10 rounded-md bg-[#171717] transition-colors"></div>

    <div className="relative z-30 w-full h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex flex-col p-4 gap-1 flex-grow">
          <p className="font-semibold truncate">Projeto new</p>
          <p className="opacity-60 text-xs line-clamp-3">
            A platform that helps students improve their theses with AI and expert support.
          </p>
        </div>
      </div>
    </div>

    <div
      className="pointer-events-none absolute inset-px z-10 rounded-md opacity-70 transition-opacity block"
    ></div>
    <div className="pointer-events-none absolute inset-0 rounded-md bg-[#171717] border border-[#212121] block"></div>
  </div>
                </span>

                <span style={{ opacity: 1, transform: "none" }}>
  <div className="group relative flex w-96 h-32 rounded-md cursor-pointer z-10">
    <div className="absolute inset-px z-10 rounded-md bg-[#171717] transition-colors"></div>

    <div className="relative z-30 w-full h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex flex-col p-4 gap-1 flex-grow">
          <p className="font-semibold truncate">Projeto new</p>
          <p className="opacity-60 text-xs line-clamp-3">
            A platform that helps students improve their theses with AI and expert support.
          </p>
        </div>
      </div>
    </div>

    <div
      className="pointer-events-none absolute inset-px z-10 rounded-md opacity-70 transition-opacity block"
    ></div>
    <div className="pointer-events-none absolute inset-0 rounded-md bg-[#171717] border border-[#212121] block"></div>
  </div>
                </span>

                <span style={{ opacity: 1, transform: "none" }}>
  <div className="group relative flex w-96 h-32 rounded-md cursor-pointer z-10">
    <div className="absolute inset-px z-10 rounded-md bg-[#171717] transition-colors"></div>

    <div className="relative z-30 w-full h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex flex-col p-4 gap-1 flex-grow">
          <p className="font-semibold truncate">Projeto new</p>
          <p className="opacity-60 text-xs line-clamp-3">
            A platform that helps students improve their theses with AI and expert support.
          </p>
        </div>
      </div>
    </div>

    <div
      className="pointer-events-none absolute inset-px z-10 rounded-md opacity-70 transition-opacity block"
    ></div>
    <div className="pointer-events-none absolute inset-0 rounded-md bg-[#171717] border border-[#212121] block"></div>
  </div>
                </span>

              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
