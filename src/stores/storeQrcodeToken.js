// Utilities
import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useQrCodeTokenStore = defineStore('qrcodetoken', () => {
  const qrcode = reactive({
    ip: '',
    token: '',
    registered: false
  })

  const registeredToken = ref(false)

  const isThereAToken = computed(() => qrcode.registered)
  const existsToken = computed(() => registeredToken.value)

  function setTokenAndIp() {
    qrcode.token = localStorage.getItem(import.meta.env.VITE_KEY_QRTOKEN)
    qrcode.ip = localStorage.getItem('ip')
    qrcode.registered = true
  }

  function setToken() {
    registeredToken.value = true
  }

  return {
    qrcode,
    isThereAToken,
    setTokenAndIp,
    registeredToken,
    existsToken,
    setToken
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useQrCodeTokenStore, import.meta.hot))
// }
