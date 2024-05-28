import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { useLocalStorage } from '@vueuse/core'

import type { Project } from '../interfaces/projects.interface'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []))

  const addProject = (name: string) => {
    if (!name || name === '') return

    projects.value.push({ id: uuid(), name, tasks: [] })
  }

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return

    const project = projects.value.find((project) => project.id === projectId)

    if (!project) return

    project.tasks.push({ id: uuid(), name: taskName })
  }

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((project) => project.id === projectId)

    if (!project) return

    const task = project.tasks.find((task) => task.id === taskId)

    if (!task) return

    task.completedAt = task.completedAt ? undefined : new Date()
  }

  return {
    //? Props
    projects,

    //* Getters
    projectsList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const completed = project.tasks.filter((task) => task.completedAt).length
        const total = project.tasks.length

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completion: total === 0 ? 0 : Math.round((completed / total) * 100)
        }
      })
    }),

    //! Actions
    addProject,
    addTaskToProject,
    toggleTask
  }
})
