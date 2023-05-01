<script setup>
import { RouterLink, RouterView, routerKey, useRouter } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <div class="card bg-gray-900 p-5 w-96">
          <p class="text-5xl">Register</p>
          <form @submit="register">
            <div class="form-control w-full max-w-xs mb-5">
              <label class="label">
                <span class="label-text">name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                v-model="data.name"
                class="input input-bordered w-full max-w-xs"
              />
            </div>
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
              <RouterLink to="/" class="btn btn-primary mr-3">kembali</RouterLink>
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
  name: 'register',
  data() {
    return {
      data: {
        name: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async register(e) {
      e.preventDefault()
      const response = await AuthenticatedService.register(this.data)
      this.$router.push('/')
    }
  },
  mounted() {
    console.log(localStorage.getItem('token'))
  }
}
</script>
