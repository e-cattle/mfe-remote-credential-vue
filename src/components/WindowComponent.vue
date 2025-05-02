<script setup>
import { ref } from 'vue'
// import { useQrCodeTokenStore } from '@/stores/storeQrcodeToken'

const step = ref(1)

const setExistsToken = n => {
  step.value = n
}
const qrCodeImage = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL + 'eCattleQrCode.png'
  : '/eCattleQrCode.png'
</script>

<template>
  <v-window v-model="step">
    <v-window-item :value="1">
      <v-card-text>
        <v-img
          class="mx-auto cursor-pointer mt-4"
          width="120"
          height="120"
          :src="qrCodeImage"
          @click="step++"
        >
          <template #sources>
            <source :srcset="qrCodeImage" />
          </template>
        </v-img>
        <v-card-text class="text-medium-emphasis text-center mt-0">
          Toque/clique no QRCode acima para conectar a câmera
        </v-card-text>
      </v-card-text>
    </v-window-item>
    <v-window-item :value="2">
      <QrCodeScan @is-there-a-token="setExistsToken" />
    </v-window-item>
    <v-window-item :value="3">
      <RegisterApplication />
    </v-window-item>
  </v-window>
</template>
