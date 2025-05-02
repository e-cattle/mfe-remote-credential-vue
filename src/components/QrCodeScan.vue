<script setup>
import { computed, ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useRouter } from 'vue-router'

// import { useQrCodeTokenStore } from '@/stores/storeQrcodeToken'

// const store = useQrCodeTokenStore()
// const qrToken = computed(() => store.setTokenAndIp)
// const { setQrToken } = store

const emit = defineEmits(['isThereAToken'])

const sendEmit = step => {
  emit('isThereAToken', step)
}

const router = useRouter()
const isValid = ref(undefined)
const paused = ref(false)
const result = ref(null)
const error = ref('')

localStorage.clear()

const validationPending = computed(
  () => isValid.value === undefined && paused.value
)

const validationSuccess = computed(() => isValid.value === true)
const validationFailure = computed(() => isValid.value === false)

function resetValidationState() {
  isValid.value = undefined
}

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'você precisa conceder permissão de acesso à câmera'
  } else if (err.name === 'NotFoundError') {
    error.value += 'nenhuma câmera neste dispositivo'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'contexto seguro necessário (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'a câmera já está em uso?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'câmeras instaladas não são adequadas'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'A API de fluxo não é suportada neste navegador'
  } else if (err.name === 'SyntaxError') {
    error.value += 'Unexpected number in JSON at position 1 (line 1 column 2)'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'O acesso à câmera só é permitido em contexto seguro. Use HTTPS ou localhost em vez de HTTP.'
  } else {
    error.value += err.message
  }
}

async function onDetect([firstDetectedCode]) {
  result.value = firstDetectedCode.rawValue
  paused.value = true
  await timeout(300)
  isValid.value = result.value.startsWith('{"ip"')

  await timeout(300)

  if (isValid.value) {
    result.value = await JSON.parse(result.value)
    const { ip, token } = await result.value

    // pretend it's taking really long
    // isValid.value = result.value.startsWith('http')
    if (ip && token) {
      isValid.value = true

      // getQRToken(import.meta.env.VITE_KEY_QRTOKEN, token, 'ip', ip)
      localStorage.setItem(import.meta.env.VITE_KEY_QRTOKEN, token)
      localStorage.setItem('ip', ip)
      sendEmit(3)
      await timeout(300)
      paused.value = true
    } else {
      router.push({ path: '/' })
    }
  } else {
    result.value = undefined
    paused.value = false
  }
}

function timeout(ms) {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms)
  })
}
</script>

<template>
  <qrcode-stream
    class="d-flex justify-center align-center"
    :paused="paused"
    @detect="onDetect"
    @error="onError"
    @camera-on="resetValidationState"
  >
    <div
      v-if="validationSuccess"
      class="h-100 d-flex justify-center align-center text-h5 bg-secondaryContainer text-secondary opacity-80"
    >
      Token válido!
    </div>
    <SnackBar
      v-if="validationFailure || !!error"
      title="QRCode Inválido"
      :text="error || 'Isto não é um token!'"
      v-model="validationFailure"
      color="error"
    />
    <!-- <div
      v-if="validationFailure"
      class="h-100 d-flex justify-center align-center text-h5 bg-errorContainer text-error opacity-80"
    >
      Isto não é um token!
    </div> -->

    <div
      v-if="validationPending"
      class="h-100 d-flex justify-center align-center text-h5 bg-tertiaryContainer text-tertiary opacity-60"
    >
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
  </qrcode-stream>
</template>
