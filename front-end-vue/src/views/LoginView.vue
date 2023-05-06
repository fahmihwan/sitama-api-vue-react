<!-- <script setup>
import { RouterLink, RouterView, routerKey, useRouter } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
</script> -->

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <div class="card bg-gray-900 p-5 w-96">
          <p class="text-5xl mb-5">Login VueJs</p>
          <form @submit="login">
            <div class="form-control w-full max-w-xs mb-5">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                v-model="data.username"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="Password"
                placeholder="Password"
                v-model="data.password"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div class="p-5">
              <button class="btn btn-primary mr-3">login</button>
              <!-- <RouterLink to="/register" class="btn btn-primary mr-3">register</RouterLink> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthenticatedService from '../services/AuthenticatedService'

import axios from 'axios'

// Vue.use(VueRouter)

export default {
  name: 'login',
  data() {
    return {
      data: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          username: this?.data?.username,
          password: this?.data?.password
        })
        localStorage.setItem('token', response.data.access_token)

        this.$router.push('/home')
      } catch (error) {
        console.error(error)
      }

      // await localStorage.setItem('token', response.data.access_token)
    }
  },
  mounted() {
    console.log(localStorage.getItem('token'))
  }
}
</script>
