<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <div class="container">
      <RouterLink class="btn btn-primary mb-2" to="/add-data">Add</RouterLink>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>title</th>
              <th>description</th>
              <th>attachment</th>
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
                <div class="overflow-hidden text-ellipsis w-[200px]">
                  {{ item?.description }}
                </div>
              </td>
              <td>{{ item?.attachment }}</td>
              <td>{{ item?.department }}</td>
              <td>{{ item?.assign }}</td>
              <td>Quality Control Specialist</td>
              <td>
                <button class="btn btn-error" @click="deleteData(item.id)">delete</button>
              </td>
            </tr>
            <!-- row 2 -->
          </tbody>
        </table>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
<script>
import CrudDataService from '../services/CrudDataService'
import axios from 'axios'
export default {
  name: 'list-data',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async getAll() {
      CrudDataService.getAll()
        .then((res) => {
          this.items = res.data.results
        })
        .catch((err) => console.log(err))
    },
    async deleteData(id) {
      CrudDataService.delete(id)
        .then((res) => {
          console.log(res)
          this.getAll()
        })
        .catch((err) => console.log(err))
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
<!-- 
<script>
import { RouterLink, RouterView } from 'vue-router'
import AuthenticatedLayout from '../components/AuthenticatedLayout.vue'
</script> -->
