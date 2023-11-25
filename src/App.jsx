import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom'
import { authSlice } from './slices/authSlice.js'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader() {
      return { user: authSlice.username }
    },
    Component: Outlet,
    children: [
      {
        path: 'login',
        lazy: () => import('./routes/LoginRoute.jsx'),
      },
      {
        path: 'dashboard',
        lazy: () => import('./routes/DashboardRoute.jsx'),
      },
      {
        path: '/',
        lazy: () => import('./routes/NotFoundRoute.jsx'),
      },
      {
        path: '*',
        lazy: () => import('./routes/NotFoundRoute.jsx'),
      },
    ],
  },
  {
    path: '/logout',
    Component: null,
    async loader() {
      await authSlice.signOut()
      return redirect('/login')
    },
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
