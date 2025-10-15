import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

export function useToast() {
  function success(message, duration = 3000) {
    addToast(message, 'success', duration)
  }

  function error(message, duration = 3000) {
    addToast(message, 'error', duration)
  }

  function warning(message, duration = 3000) {
    addToast(message, 'warning', duration)
  }

  function info(message, duration = 3000) {
    addToast(message, 'info', duration)
  }

  function addToast(message, type = 'info', duration = 3000) {
    const id = nextId++
    toasts.value.push({ id, message, type })
    
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
  }

  function removeToast(id) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast
  }
}
