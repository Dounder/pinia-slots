<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4">{{ subtitle }}</p>

      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />

          <div class="flex justify-end mt-5">
            <button type="button" class="btn mr-4" @click="$emit('close')">Close</button>
            <button type="button" class="btn btn-primary">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  open: boolean
  placeholder?: string
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Nombre de proyecto',
  title: 'Nuevo proyecto',
  subtitle: 'Ingresa el nombre del proyecto'
})

const emits = defineEmits<{
  close: [void]
  value: [text: string]
}>()

watch(props, ({ open }) => {
  if (open) inputRef.value?.focus()

  if (!open) inputRef.value?.blur()
})

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus()
    return
  }

  emits('value', inputValue.value.trim())
  emits('close')

  console.log({ value: inputValue.value.trim() })

  inputValue.value = ''
}
</script>
