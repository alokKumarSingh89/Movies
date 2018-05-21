import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
// import Auth from '../auth'

Vue.use(Vuex)
// Auth.initializeApp()
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('details'))
  },
  mutations: {
    setUser (state, payload) {
      localStorage.setItem('details', JSON.stringify(payload))
      state.user = payload
    }
  },
  actions: {
    signInWithFacebook ({commit}, payload) {
      return new Promise((resolve, reject) => {
        var provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
          let newUser = {
            token: result.credential.accessToken,
            email: result.user.email,
            name: result.user.displayName,
            provider: 'facebook'
          }
          commit('setUser', newUser)
          resolve('Successfully login with facebook')
        }).catch((error) => {
          reject(error)
        })
      })
    },
    signInWithEmailAndPassword ({commit}, payload) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(result => {
          let newUser = {
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayNames
          }
          commit('setUser', newUser)
          resolve('Sucessfully login to page')
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    signUpUserWithEmailAndPassword ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(result => {
        let newUser = {
          id: result.user.uid,
          email: result.user.email,
          name: result.user.displayNames
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        console.log(error)
      })
    },
    autoSignIn ({commit}, payload) {
      let newUser = {
        token: payload.credential.accessToken,
        email: payload.email,
        name: payload.displayName
      }
      commit('setUser', newUser)
    },
    signOut ({commit}, payload) {
      commit('setUser', payload)
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  }
})
