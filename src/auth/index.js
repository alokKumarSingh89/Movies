import firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyDXBkQf4xWS3teh283SuAXqHNeoVzcxWKM',
  authDomain: 'vue-meetup-f8ac4.firebaseapp.com',
  databaseURL: 'https://vue-meetup-f8ac4.firebaseio.com',
  projectId: 'vue-meetup-f8ac4',
  storageBucket: 'gs://vue-meetup-f8ac4.appspot.com'
}
export default {
  appState: false,
  isAuthenticated: false,
  user () {
    return this.firebaseAuth.currentUser
  },
  firebaseAuth: null,
  initializeApp () {
    if (!this.appState) {
      this.init()
    }
  },
  init () {
    firebase.initializeApp(config)
    this.appState = true
    this.firebaseAuth = firebase.auth()
  },
  authenticateUser () {
  }
}
