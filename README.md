# mfe-remote-credential-vue

## About

This is a template for a remote application, in which all the essential libraries and plugins are already installed, as well as all the necessary configurations for building an application with micro-frontend architecture and with all the resources of a progressive web application (PWA). This template comes with a component for application accreditation in the BigBoxx middleware, to allow access to sensory data collected by the e-Cattle platform.

## ✨ Features

This project was developed using:

- JavaScript
- Vue.js
- Vutify
- Vite
- Micro-frontend architecture
- Progressive Web App (PWA)

In addition, to maintain the project's coding standard, we have the following modules installed and configured:

- Husk
- Prettier
- Eslint
- Commitlint

In order for this to be an application with Micro-frontend architecture with PWA features, it was necessary to install some external modules, namely:

- [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- [Vite PWA](https://vite-pwa-org.netlify.app/)

The proper installation and configuration of each of these plugins will ensure the proper functioning of an application with the features described above.

## 👩🏿‍💻 Post-installation

This _template_ will run without the need for any changes or adjustments to your code. It comes with a simple component for testing, which can be deleted or reused as needed or desired. It is already exposed in the `config.federation.js` file contained in the project root:

```javascript
// config.federation of the remote application
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
```

## Contribute 🚀

If you want to contribute, clone this repository, create your own working branch and get to work!

```bash
git clone https://github.com/e-cattle/mfe-remote-credential-vue.git
```

```bash
git checkout -b feature/NAME
```

At the end, open a _Pull Request_ explaining the problem solved or the feature added. If there is one, add screenshots of the visual changes and wait for the review!

[How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request) | [Commit Pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

## License 📃

This project is licensed under the [MIT](./LICENSE) license
