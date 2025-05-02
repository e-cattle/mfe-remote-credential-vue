import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApplicationToken = defineStore('apptoken', () => {
  const tokenApplication = ref(undefined)

  const setApplicationToken = tokenValue => {
    tokenApplication.value = tokenValue
    localStorage.setItem(import.meta.env.VITE_KEY_APP_TOKEN, tokenValue)
  }

  return { tokenApplication, setApplicationToken }
})
