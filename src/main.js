import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'
import store from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDJ-x9TnssRxxe8eZ-zvQQDCa4SJ9Hw0EE',
      authDomain: 'vueapp-1133d.firebaseapp.com',
      databaseURL: 'https://vueapp-1133d.firebaseio.com',
      projectId: 'vueapp-1133d',
      storageBucket: 'vueapp-1133d.appspot.com',
      messagingSenderId: '84762527966'
    })
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //     this.$router.go(-1)
    //   } else {
    //     this.$router.push('/login')
    //   }
    // })
  }
})
