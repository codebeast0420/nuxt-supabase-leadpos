<template>
      <!-- Global notification live region, render this permanently at the end of the document -->
      <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
          <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" />
        </div>
      </div>
</template>

<script setup lang="ts">
const { toasts, addToast } = useToasts()

// addToast({ title: 'Hello world12', message: 'This is a toast', variant: 'error' })
</script>
