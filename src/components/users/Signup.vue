<template>
  <v-container>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <form class="indigo lighten-4 px-4" >
          <v-text-field v-model="name" :error-messages="nameErrors"
            label="Name" required @input="$v.name.$touch()"
            @blur="$v.name.$touch()"></v-text-field>
          <v-text-field v-model="email" :error-messages="emailErrors"
            label="E-mail" required @input="$v.email.$touch()" 
            @blur="$v.email.$touch()"></v-text-field>
          <v-text-field v-model="password" :error-messages="passwordErrors"
            label="Password" required @input="$v.password.$touch()" 
            @blur="$v.password.$touch()" type="password"></v-text-field>
          <!-- <v-select v-model="select" :items="items" :error-messages="selectErrors"
            label="Item" required @change="$v.select.$touch()" 
            @blur="$v.select.$touch()" ></v-select> -->
          <!-- <v-checkbox v-model="checkbox" :error-messages="checkboxErrors"
            label="Do you agree?" required @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"></v-checkbox> -->
          <v-btn @click="submit" class="primary">submit</v-btn>
          <v-btn @click="clear" flat small class="primary--text">clear</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'
import firebase from 'firebase'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(100) },
    email: {required, email},
    password: {required, minLength: minLength(6)}
  },
  data: () => ({
    name: '',
    email: '',
    password: ''
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be atleast 6 characters long')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.name.$error && !this.$v.email.$error && !this.$v.password.$error) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          let currentuser = firebase.auth().currentUser
          currentuser.updateProfile({displayName: this.name})
          .then(() => {
            this.$router.push('/profile')
          }).catch(error => {
            alert('Login to update profile', error)
            this.$router.push('/profile')
          })
        })
        .catch(error => {
          alert(error)
        })
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

