import httpCommon from '../http-common'

import axios from 'axios'
class CrudDataService {
  getAll() {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return httpCommon.get('/list-crud')
  }
  getDetail(id) {
    return httpCommon.get('/list-crud/' + id)
  }
  //   /list-crud
  create(data) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return httpCommon.post('/list-crud', data, config)
  }
  update(data) {
    return data
  }
  delete(id) {
    return httpCommon.delete(`/list-crud/${id}`)
  }
}
export default new CrudDataService()
