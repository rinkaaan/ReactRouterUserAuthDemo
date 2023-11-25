import { wait } from '../common/utils.js'
import Cookies from 'js-cookie'

export const authSlice = {
  isAuthenticated: !!Cookies.get('username'),
  username: Cookies.get('username'),
  async signIn(username) {
    await wait(500)
    Cookies.set('username', username)
    authSlice.isAuthenticated = true
    authSlice.username = username
  },
  async signOut() {
    await wait(500)
    Cookies.remove('username')
    authSlice.isAuthenticated = false
    authSlice.username = undefined
  },
}
