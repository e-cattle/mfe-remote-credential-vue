export default {
  name: 'registerDevice',
  filename: 'remoteEntry.js',
  exposes: {
    './ScanQrCode': './src/pages/index.vue',
    './storeQrcodeToken': './src/stores/storeQrcodeToken.js',
    './storeApplicationToken': './src/stores/storeApplicationToken.js',
    './storage': './src/utils/storage.js'
  },
  shared: [
    'vue',
    'vuetify',
    'pinia',
    'vue-router',
    'qrcode-vue3',
    'vue-qrcode-reader'
  ]
}
// EXPOR STORES TOKENS
