<template>
  <div class="overflow-x-auto flex-1">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th></th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 2 -->
        <tr
          class="hover"
          v-for="(project, index) in projectsStore.projectWithCompletion"
          :key="project.id"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            />
            {{ project.completion }}%
          </td>
        </tr>
      </tbody>
    </table>

    <input-modal
      :open="modalOpen"
      @close="modalOpen = false"
      @value="projectsStore.addProject"
      title="Nuevo proyecto"
      subtitle="Ingresa el nombre del proyecto"
      placeholder="Nombre de proyecto"
    />

    <custom-modal :open="customModalOpen">
      <template #header>
        <h1 class="text-3xl font-bold">Custom Modal</h1>
      </template>

      <template #body>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur impedit, veniam qui
          numquam alias perspiciatis illo quos necessitatibus accusantium ullam corporis vero fugit.
          Magnam alias officiis necessitatibus. Harum, voluptatum! Incidunt.
        </p>
      </template>

      <template #actions>
        <div class="flex justify-end mt-5">
          <button @click="customModalOpen = false" class="btn mr-4">Close</button>
          <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
        </div>
      </template>
    </custom-modal>

    <fab-button @click="modalOpen = true">
      <add-circle />
    </fab-button>

    <fab-button @click="customModalOpen = true" position="bottom-left">
      <modal-icon />
    </fab-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CustomModal from '@/modules/common/components/CustomModal.vue'
import FabButton from '@/modules/common/components/FabButton.vue'
import InputModal from '@/modules/common/components/InputModal.vue'
import AddCircle from '@/modules/common/icons/AddCircle.vue'
import ModalIcon from '@/modules/common/icons/ModalIcon.vue'
import { useProjectsStore } from '../store/projects.store'

const projectsStore = useProjectsStore()

const modalOpen = ref(false)
const customModalOpen = ref(false)
</script>

<style scoped></style>
