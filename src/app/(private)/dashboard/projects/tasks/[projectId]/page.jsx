'use client'

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../../../../../../lib/tasks"
import Title from "@/components/ui/Title"

const taskTypeMap = {
  0: "Development",
  1: "Design",
  2: "Testing",
}

const taskTypeReverseMap = {
  Development: 0,
  Design: 1,
  Testing: 2,
}

const TasksPage = () => {
  const {projectId} = useParams()

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [taskType, setTaskType] = useState("Development")
  const [loading, setLoading] = useState(true)

  const [editingTask, setEditingTask] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTaskType, setEditTaskType] = useState("")

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getAllTasks(projectId)
        setTasks(data)
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error.message)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) loadTasks()
  }, [projectId])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title || !description || !projectId) return

    try {
      const newTask = await createTask({
        title,
        description,
        taskType: taskTypeReverseMap[taskType],
        projectId,
      })
      setTasks((prev) => [...prev, newTask])
      setTitle("")
      setDescription("")
      setTaskType("Development")
    } catch (error) {
      console.error("Erro ao criar tarefa:", error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error.message)
    }
  }

  const openEditModal = async (id) => {
    try {
      const task = await getTaskById(id)
      setEditingTask(task)
      setEditTitle(task.title)
      setEditDescription(task.description)
      setEditTaskType(task.taskType)
    } catch (error) {
      console.error("Erro ao buscar tarefa:", error.message)
    }
  }

  const handleUpdate = async () => {
    if (!editTitle || !editDescription || !projectId) return
    try {
      const updated = {
        title: editTitle,
        description: editDescription,
        taskType: editTaskType,
      }
      const result = await updateTask(editingTask.id, projectId, updated)
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...result } : t))
      )
      setEditingTask(null)
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error.message)
    }
  }

  return (
    <div>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-zinc-900 border border-[#212121] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Task</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título"
              className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descrição"
              className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
            />
            <select
              value={editTaskType}
              onChange={(e) => setEditTaskType(Number(e.target.value))}
              className="w-full mb-4 p-2 rounded bg-zinc-800 text-white"
            >
              <option value="0">Development</option>
              <option value="1">Design</option>
              <option value="2">Testing</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-full w-[250px] hidden md:block"></div>
      <div className="flex-1 flex flex-col">
        <main className="w-full flex justify-center pb-[11.5rem] mx-auto px-8 md:pb-0 md:max-w-4xl">
          <div className="flex flex-col">
            <section className="flex flex-col gap-5">
              <Title />
              <h1 className="text-2xl font-extrabold">Tasks</h1>

              <form onSubmit={handleCreate} className="flex flex-col gap-3 w-full mb-10">
                <input
                  type="text"
                  placeholder="Task title"
                  className="p-2 rounded bg-zinc-800 text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Task description"
                  className="p-2 rounded bg-zinc-800 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <select
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="p-2 rounded bg-zinc-800 text-white"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Testing">Testing</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add Task
                </button>
              </form>

              <div className="flex flex-col gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-zinc-900 border border-[#212121] p-4 rounded-lg flex flex-col gap-2"
                  >
                    <h3 className="text-lg font-bold text-white">{task.title}</h3>
                    <p className="text-white text-sm">{task.description}</p>
                    <span className="text-white text-xs">{taskTypeMap[task.taskType]}</span>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => openEditModal(task.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TasksPage
