<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <div class="container">
      <RouterLink class="btn btn-primary mb-5" to="/home">back</RouterLink>
      <div class="overflow-x-auto">
        <div class="w-1/2">
          <div class="card bg-gray-900 p-5">
            <form @submit="handleSubmit" enctype="multipart/form-data">
              <div class="form-control w-full max-w-xs mb-5">
                <label class="label">
                  <span class="label-text">title</span>
                </label>
                <input
                  type="text"
                  v-model="data.title"
                  placeholder="title"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
              <div class="form-control w-full max-w-xs mb-5">
                <label class="label">
                  <span class="label-text">description</span>
                </label>
                <input
                  type="text"
                  v-model="data.description"
                  placeholder="description"
                  class="input input-bordered w-full max-w-xs"
                />
              </div>
              <div class="form-control w-full max-w-xs mb-5">
                <label class="label">
                  <span class="label-text">attachment</span>
                </label>
                <input
                  type="file"
                  @change="previewFiles"
                  accept="image/*"
                  class="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
                <!-- <input
                  type="text"
                  placeholder="Username"
                  class="input input-bordered w-full max-w-xs"
                /> -->
              </div>
              <div class="form-control w-full max-w-xs mb-5">
                <label class="label">
                  <span class="label-text">department</span>
                </label>
                <select
                  @change="changeDepartment"
                  v-model="data.department"
                  placeholder="description"
                  class="select select-bordered"
                >
                  <option disabled selected>Pick one</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Sales marketing">Sales marketing</option>
                </select>
              </div>
              <div class="form-control w-full max-w-xs mb-5">
                <label class="label">
                  <span class="label-text">assign</span>
                </label>
                <select @change="changeAssign" v-model="data.assign" class="select select-bordered">
                  <option v-for="(name, id) in assignOption" :value="name">{{ name }}</option>
                </select>
              </div>
              <div class="form-control w-full max-w-xs mb-5">
                <label class="label">
                  <span class="label-text">cc</span>
                </label>
                <select v-model="data.cc" class="select select-bordered">
                  <option v-for="(name, id) in ccOption" :value="name">{{ name }}</option>
                </select>
              </div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
<script>
import CrudDataService from '../services/CrudDataService'
export default {
  name: 'list-data',
  data() {
    return {
      data: {
        title: '',
        description: '',
        attachment: '',
        department: '',
        assign: '',
        cc: ''
      },
      assignOption: [],
      ccOption: [],
      createImage: ''
    }
  },

  methods: {
    async previewFiles(e) {
      var files = e.target.files || e.dataTransfer.files
      this.data.attachment = files
    },

    changeDepartment(e) {
      if (e.target.value == 'Information Technology') {
        this.assignOption = ['rudi', 'joko', 'irwan']
      }
      if (e.target.value == 'Sales marketing') {
        this.assignOption = ['Lusi', 'Komar', 'Ambar']
      }
    },
    changeAssign() {
      console.log(this.assignOption)
      this.ccOption = this.assignOption.filter((d) => d !== this.data.assign)
    },
    async handleSubmit(e) {
      e.preventDefault()

      await CrudDataService.create(this.data)
        .then((res) => {
          console.log(res)
          this.$router.push('/home')
        })
        .catch((err) => {
          console.log(err)
          alert(err)
        })
    }
  },
  beforeMount() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/')
    }
  }
}
</script>
<!-- 
<script>
import { RouterLink, RouterView } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
</script> -->
