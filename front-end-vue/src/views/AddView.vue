<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <div class="container">
      <RouterLink class="btn btn-primary mb-5" to="/home">back</RouterLink>
      <div class="overflow-x-auto">
        <div class="w-full flex">
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
                  <ckeditor
                    :editor="editor"
                    v-model="data.description"
                    :config="editorConfig"
                  ></ckeditor>
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
                  <select
                    @change="changeAssign"
                    v-model="data.assign"
                    class="select select-bordered"
                  >
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
          <div class="w-1/2 p-10">
            <img :src="previewImg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
<script>
import CrudDataService from '../services/CrudDataService'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'

export default {
  name: 'add-data',
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
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
      createImage: '',
      previewImg: ''
    }
  },

  methods: {
    async previewFiles(e) {
      var files = e.target.files || e.dataTransfer.files
      this.data.attachment = files[0]
      this.previewImg = URL.createObjectURL(files[0])
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
      this.ccOption = this.assignOption.filter((d) => d !== this.data.assign)
    },
    async handleSubmit(e) {
      e.preventDefault()
      let token = localStorage.getItem('token')

      const formData = new FormData()
      formData.append('title', this.data.title)
      formData.append('description', this.data.description)
      formData.append('attachment', this.data.attachment)
      formData.append('department', this.data.department)
      formData.append('assign', this.data.assign)
      formData.append('cc', this.data.cc)

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/list-crud', formData, {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token} `
          }
        })
        console.log(response)
        this.$router.push('/home')
      } catch (error) {
        console.log(error)
      }
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
