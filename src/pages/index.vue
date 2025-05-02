<script setup>
// import img from '/eCattle.png'
const eCattleLogo = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL + 'eCattle.png'
  : '/eCattle.png'
</script>

<template>
  <v-container fluid class="w-100">
    <v-row justify="center">
      <v-col cols="12" lg="4" md="6" sm="10">
        <div>
          <v-img class="mx-auto my-16" max-width="120" :src="eCattleLogo">
            <template #sources>
              <source :srcset="eCattleLogo" />
            </template>
          </v-img>
          <v-card>
            <CardItem />
            <WindowComponent />
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
