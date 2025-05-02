import { ref } from 'vue'
import api from '@/services/api'

// import { useApplicationToken } from '@/stores/storeToken'
// import { storeToRefs } from 'pinia'

export const useAPI = () => {
  const data = ref({})
  const error = ref({})
  // const { tokenApplication } = useApplicationToken()
  // const { appIsRegistered } = storeToRefs(useApplicationToken())
  const token = ref(localStorage.getItem(import.meta.env.VITE_KEY_QRTOKEN))

  async function callToAPI(url, method = 'get', fields = {}) {
    data.value = {}
    error.value = {}

    try {
      const res = await api({
        method,
        url,
        data: fields,
        headers: { Authorization: token.value }
      })
      data.value = await res.data
    } catch (err) {
      error.value = err
    }
  }

  return { data, error, callToAPI }
}
