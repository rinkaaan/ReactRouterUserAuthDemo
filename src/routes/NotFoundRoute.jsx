import { authSlice } from '../slices/authSlice.js'
import { redirect } from 'react-router-dom'

export function loader() {
  if (!authSlice.isAuthenticated) {
    return redirect('/login')
  } else {
    return redirect('/dashboard')
  }
}
