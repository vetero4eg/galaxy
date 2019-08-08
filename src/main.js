import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyALM1EbMTETugHJ6YBcFCejO_bkHTC5JRw',
  authDomain: 'galaxy-starship.firebaseapp.com',
  databaseURL: 'https://galaxy-starship.firebaseio.com',
  projectId: 'galaxy-starship',
  storageBucket: '',
  messagingSenderId: '130905178443',
  appId: '1:130905178443:web:64f315ff6408f00a',
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
