<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :name="project?.name ?? ''" />
    </section>

    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover" v-for="task in project?.tasks" :key="task.id">
              <th>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  :checked="!!task.completedAt"
                  @change="projectStore.toggleTask(project?.id ?? '', task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr class="hover">
              <th></th>
              <td colspan="2">
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva Tarea"
                  v-model="taskName"
                  @keydown.enter.prevent="onAddTask"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Project } from '../interfaces/projects.interface'
import { useProjectsStore } from '../store/projects.store'

interface Props {
  id: string
}

const router = useRouter()

const props = defineProps<Props>()
const projectStore = useProjectsStore()

const project = ref<Project | null>()
const taskName = ref('')

const onAddTask = () => {
  if (!taskName.value) return

  projectStore.addTaskToProject(props.id, taskName.value)
  taskName.value = ''
}

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectsList.find((project) => project.id === props.id)

    if (!project.value) router.replace({ name: 'projects' })
  },
  { immediate: true }
)
</script>
