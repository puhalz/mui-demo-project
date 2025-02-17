import * as React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Outlet } from 'react-router'
import { ReactRouterAppProvider } from '@toolpad/core/react-router'
import type { Navigation } from '@toolpad/core/AppProvider'
import { Person } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export default function App() {
    const { t } = useTranslation()

    const NAVIGATION: Navigation = [
        {
            kind: 'header',
            title: t('Main items'),
        },
        {
            title: t('Dashboard'),
            icon: <DashboardIcon />,
        },
        {
            segment: 'users',
            title: t('users'),
            icon: <Person />,
        },
    ]

    const BRANDING = {
        title: 'mui-demo-project',
    }

    return (
        <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
            <Outlet />
        </ReactRouterAppProvider>
    )
}
