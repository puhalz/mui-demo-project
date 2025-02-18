import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Layout from './layouts/Dashboard'
import DashboardPage from './pages/Home'
import UserPage from './pages/Users'
import './i18n'
import LoginPage from './pages/Login'
import LoginLayout from './layouts/LoginLayout'

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: Layout,
                children: [
                    {
                        path: '/home',
                        Component: DashboardPage,
                    },
                    {
                        path: '/users',
                        Component: UserPage,
                    },
                ],
            },
            {
                path: '/login',
                Component: LoginLayout,
                children: [
                    {
                        path: '',
                        Component: LoginPage,
                    }
                ],
            },
        ],
    },
])

async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    const { worker } = await import('./mocks/browser')

    return worker.start()
}
enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
})
