<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-btn dark color="indigo" @click="loginProvider('Facebook')">
          <v-icon>hand-paper</v-icon>
          Facebook
        </v-btn>
      </v-flex>
      <v-divider></v-divider>
      <v-flex xs8 offset-xs2>
        <div>
          <v-alert v-model="alert" :type="type" dismissible>
            {{actionMsg}}
          </v-alert>
        </div>
        <form class="indigo lighten-4 px-4">
          <v-text-field v-model="email" label="Email" box class="pa-3--text"></v-text-field>
          <v-text-field v-model="password" label="Password" box type="password"></v-text-field>
          <!-- <v-select v-model="select" :items="items" :error-messages="selectErrors"
            label="Item" required @change="$v.select.$touch()" 
            @blur="$v.select.$touch()" ></v-select> -->
          <!-- <v-checkbox v-model="checkbox" :error-messages="checkboxErrors"
            label="Do you agree?" required @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"></v-checkbox> -->
          <v-btn @click="submit" class="primary">submit</v-btn>
          <v-btn to="registration" flat small class="primary--text">Don.t have , go to login</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    alert: false,
    type: 'success',
    actionMsg: ''
  }),
  mounted () {
    if (this.isAuthenticate) {
      this.$router.push('/')
    }
  },
  computed: {
    isAuthenticate () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    loginProvider (provider) {
      this.$store.dispatch('signInWith' + provider)
        .then(status => {
          this.actionMsg = status
          this.alert = true
          this.type = 'success'
          this.$router.go(-1)
        })
        .catch(error => {
          this.alert = true
          this.type = 'error'
          this.actionMsg = error.message
        })
    },
    submit () {
      if (this.email === '' || this.password === '') {
        alert('Please Enter the all field')
      } else {
        this.$store.dispatch('signInWithEmailAndPassword', {email: this.email, password: this.password})
        .then(status => {
          this.actionMsg = status
          this.alert = true
          this.type = 'success'
          this.$router.push('/')
        })
        .catch(error => {
          this.alert = true
          this.type = 'error'
          this.actionMsg = error.message
        })
      }
    }
  }
}
</script>

