<template>
  <div>{{ modelDevice }}</div>
  <AppSnackbar
    v-if="errorValue"
    title="Token expirou"
    text="Cadastro não realizado por falta de autorização"
    v-model="errorValue"
  />

  <v-card-text class="px-16 py-4">
    <v-text-field
      id="name"
      ref="name"
      v-model="app.fields.name"
      :rules="[() => !!app.fields.name || 'Este campo é obrigatório']"
      label="Nome do Aplicativo"
      placeholder="Ganho de produtividade"
      required
      clearable
      prepend-icon="mdi-view-dashboard"
    ></v-text-field>

    <v-text-field
      id="device"
      ref="device"
      v-model="app.fields.device"
      label="Dispositivo"
      prepend-icon="mdi-remote"
      clearable
      required
    ></v-text-field>

    <v-text-field
      id="user"
      ref="user"
      v-model="app.fields.user"
      :rules="[() => !!app.fields.user || 'Este campo é obrigatório']"
      label="Nome do Usuário"
      placeholder="John Doe"
      required
      clearable
      prepend-icon="mdi-account-cowboy-hat"
    ></v-text-field>

    <v-text-field
      id="email"
      ref="email"
      v-model.trim="app.fields.email"
      :rules="[() => !!app.fields.email || 'Este campo é obrigatório']"
      label="E-mail"
      placeholder="johndoe@email.com"
      required
      clearable
      prepend-icon="mdi-email"
    ></v-text-field>

    <v-text-field
      id="description"
      ref="description"
      v-model="app.fields.description"
      :rules="[() => !!app.fields.description || 'Este campo é obrigatório']"
      label="Descrição da Aplicação"
      placeholder="Gerenciamento de ganho de peso bovino"
      required
      clearable
      prepend-icon="mdi-text"
    ></v-text-field>

    <v-text-field
      id="picture"
      ref="picture"
      v-model="app.fields.picture"
      label="Imagem"
      placeholder="https://picsum.photos/300.webp/?blur=5"
      clearable
      prepend-icon="mdi-file-image"
    ></v-text-field>
  </v-card-text>

  <v-divider></v-divider>

  <v-card-actions class="px-12">
    <v-btn variant="text" @click="cancelForm"> Cancelar </v-btn>
    <v-spacer></v-spacer>
    <v-slide-x-reverse-transition>
      <v-tooltip v-if="formHasErrors" location="left">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="my-0" icon v-bind="attrs" v-on="on" @click="resetForm">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Atualizar formulário</span>
      </v-tooltip>
    </v-slide-x-reverse-transition>
    <v-btn color="primary" variant="text" @click="submit"> Enviar </v-btn>
  </v-card-actions>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { userAgentObject } from '../utils/userAgent'
import { useAPI } from '@/composables/useAPI'
import useForm from '@/composables/useForm'
import { useApplicationToken } from '@/stores/storeApplicationToken'

let UAdevice = userAgentObject.vendor ?? ''
UAdevice += userAgentObject.model ? ` ${userAgentObject.model}` : ''
UAdevice += userAgentObject.platform ? ` ${userAgentObject.platform}` : ''
UAdevice += userAgentObject.platformVersion
  ? ` ${userAgentObject.platformVersion}`
  : ''

const store = useApplicationToken()

const errorValue = ref(false)
const formHasErrors = ref('')
const router = useRouter()
const app = useForm({
  name: '',
  device: UAdevice,
  user: '',
  email: '',
  description: '',
  picture: ''
})

const submit = async () => {
  const { data, error, callToAPI } = useAPI()
  data.value = {}
  error.value = ''
  await app.submit(
    async fields => {
      const url = '/totem/application/connect'
      await callToAPI(url, 'post', fields)
      if (error.value.code) {
        // console.log('call ERROR CODE: ', error.value.code)
        errorValue.value = true
      } else {
        store.setApplicationToken(data.value.token)
        router.push('dashboard')
      }
    },
    {
      onFinish: () => app.reset('picture')
    }
  )
}

const cancelForm = () => {
  location.reload()
}

const resetForm = () => {
  formHasErrors.value = false

  app.fields = {}
}
</script>

<route>
  {
    meta: {
      layout: 'BlankLayout'
    }
  }
</route>
