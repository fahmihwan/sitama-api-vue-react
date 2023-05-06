<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginService from '../services/AuthenticatedService'
import axios from 'axios'
</script>

<template>
  <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar bg-base-300">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>
        <div className="flex-1 px-2 mx-2">CRUD VUE</div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            <li>
              <!-- {/* <RouterLink to="/">logout</RouterLink> */} -->
              <a @click="logout">logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-5">
        <slot> </slot>
      </div>
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay" />
      <ul className="menu p-4 w-80 bg-base-100">
        <li>
          <a @click="logout">logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout(e) {
      e.preventDefault()
      let token = localStorage.getItem('token')
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/logout',
          {},
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        await localStorage.removeItem('token')
        await this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
