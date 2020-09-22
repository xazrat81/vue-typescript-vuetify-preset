import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/src/locale/ru'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2083d2'
      }
    }
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
});
