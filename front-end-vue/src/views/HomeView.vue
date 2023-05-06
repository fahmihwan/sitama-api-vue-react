<template>
  <AuthenticatedLayout>
    <RouterLink class="btn btn-primary mb-2" to="/add-data">Add</RouterLink>
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>title</th>
            <th>attachment</th>
            <th>description</th>

            <th>department</th>
            <th>assign</th>
            <th>cc</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in items">
          <!-- row 1 -->
          <tr>
            <th>{{ index + 1 }}</th>

            <td>{{ item?.title }}</td>
            <td>
              <div class="w-32">
                <img :src="'http://127.0.0.1:8000/storage/' + item?.attachment" alt="" />
              </div>
            </td>
            <td>
              <div class="overflow-hidden text-ellipsis w-[200px]">
                <div v-html="item?.description"></div>
              </div>
            </td>
            <td>{{ item?.department }}</td>
            <td>{{ item?.assign }}</td>
            <td>{{ item?.cc }}</td>
            <td>
              <RouterLink
                class="btn btn-primary mb-2 mr-2"
                :to="{ name: 'edit-data', params: { id: item?.id } }"
                >edit</RouterLink
              >
              <button class="btn btn-error" @click="handleDelete(item.id)">delete</button>
            </td>
          </tr>
          <!-- row 2 -->
        </tbody>
      </table>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
import CrudDataService from '../services/CrudDataService'
import axios from 'axios'
export default {
  name: 'list-data',
  components: {
    AuthenticatedLayout: AuthenticatedLayout
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    async getAll() {
      let token = localStorage.getItem('token')
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/list-crud', {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.items = response?.data.results
      } catch (error) {
        console.log(error)
      }
    },

    async handleDelete(id) {
      let token = localStorage.getItem('token')
      if (confirm('apakah anda yakin ingin menghapus?')) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/list-crud/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          console.log(response)
          this.getAll()
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  beforeMount() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/')
    }
  },
  mounted() {
    this.getAll()
  }
}
</script>
