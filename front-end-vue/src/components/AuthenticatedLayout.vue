<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginService from '../services/AuthenticatedService'
</script>

<template>
  <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      {/* Navbar */}
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
        <div className="flex-1 px-2 mx-2">Navbar Title</div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            {/* Navbar menu content here */}
            <li>
              {/* <RouterLink to="/">logout</RouterLink> */}
              <a @click="logout">logout</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Page content here */}
      <div className="p-5">
        <slot> </slot>
      </div>
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay" />
      <ul className="menu p-4 w-80 bg-base-100">
        {/* Sidebar content here */}
        <li>
          <a @click="logout">logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AuthenticatedService from '../services/AuthenticatedService'
export default {
  methods: {
    async logout(e) {
      e.preventDefault()
      await AuthenticatedService.logout()
      await localStorage.removeItem('token')
      await this.$router.push('/')
    }
  }
}
</script>
<style scoped></style>
