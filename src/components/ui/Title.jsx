import React from 'react'

const Title = () => {
  return (
    <div>
      <span style={{ opacity: 1, transform: "none" }}>
                  <div className="flex flex-col gap-6 mt-4 ">
                    <div className="relative flex size-full rounded-md p-4 w-full z-10">
                      <div className="absolute inset-px z-10 rounded-md bg-[#171717] transition-colors"></div>
                      <div className="relative z-30 w-[700px]">
                        <div className="flex flex-col gap-4 h-full">
                          <div className="flex flex-col gap-1">
                            <div className=" rounded-lg  ">
                              <h1 className="text-3xl font-extrabold">Task Manager</h1>
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
    </div>
  )
}

export default Title
