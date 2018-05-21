<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile v-for="menu in menuItem" :key="menu.title" :to="menu.link">
          <v-list-tile-action>
            <v-icon color="indigo">{{menu.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="indigo--text">{{menu.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile style="cursor:pointer">
          <v-list-tile-action>
            <v-icon color="indigo">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="indigo--text" @click="logOut">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="user" >
        <v-icon small color="darken-2">email</v-icon>
        {{user.email}}
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      menuItem: [
        {title: 'Home', icon: 'home', link: '/'},
        {title: 'Create Movie', icon: 'add_circle', link: '/movie/new'},
        {title: 'Profile', icon: 'account_circle', link: '/profile'},
        {icon: 'face', title: 'Sign up', link: '/registration'},
        {icon: 'lock_open', title: 'Sign in', link: '/login'},
        {title: 'Facebook', icon: 'fas fa-facebook-f', link: '/facebook'}
      ]
    }),

    props: {
      source: String
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    methods: {
      logOut () {
        this.$store.dispatch('signOut', null).then(status => {
          localStorage.clear()
          this.$router.push('/')
        })
      }
    }
  }
</script>