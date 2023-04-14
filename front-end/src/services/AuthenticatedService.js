import httpCommon from '../http-common'

class AuthenticatedService {
  login(data) {
    return httpCommon.post('/login', data)
  }
  register(data) {
    return httpCommon.post('/register', data)
  }
  logout() {
    return httpCommon.post('/logout')
  }
}
export default new AuthenticatedService()
