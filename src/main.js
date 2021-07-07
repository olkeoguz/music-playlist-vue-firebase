import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//Global styles
import './assets/main.css';
import { projectAuth } from './firebase/config';

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) { //It will mount the app for the first time the auth state change.
    app = createApp(App)
      .use(router)
      .mount('#app');
  }
});
