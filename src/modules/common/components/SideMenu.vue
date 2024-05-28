<template>
  <aside class="bg-base-200 w-72">
    <h2 class="text-lg font-bold mx-4">
      <RouterLink :to="{ name: 'projects' }"> Proyectos </RouterLink>
    </h2>
    <p class="text-sm text-gray-500 mx-4" v-if="projectsStore.noProjects">No hay proyectos</p>

    <ul class="menu" v-else>
      <li v-for="project in projectsStore.projectsList" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details>
            <summary>
              <RouterLink :to="{ name: 'project', params: { id: project.id } }">
                {{ project.name }}
              </RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <router-link :to="{ name: 'project', params: { id: project.id } }">
                  {{ task.name }}
                </router-link>
              </li>
            </ul>
          </details>
        </template>

        <template v-else>
          <router-link :to="{ name: 'project', params: { id: project.id } }">
            {{ project.name }}
          </router-link>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/modules/projects/store/projects.store'

const projectsStore = useProjectsStore()
</script>
