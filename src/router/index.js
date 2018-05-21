import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '../components/movies/Movies'
import NewMovie from '../components/movies/NewMovie'
import Movie from '../components/movies/Movie'
import Signin from '../components/users/Signin'
import Signup from '../components/users/Signup'
import Profile from '../components/users/Profile'
import AuthGard from './auth_router'
import Facebook from '../components/facebook/Facebook'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/movie/new',
      name: 'NewMovie',
      component: NewMovie,
      beforeEnter: AuthGard
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/login',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/registration',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGard
    },
    {
      path: '/',
      name: 'Movies',
      component: MovieList
    },
    {
      path: '/facebook',
      name: 'Facebook',
      component: Facebook,
      beforeEnter: AuthGard,
      meta: {
        profile: 'facebook'
      }
    }
  ],
  mode: 'history'
})
