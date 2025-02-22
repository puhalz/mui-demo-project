import * as React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Outlet } from 'react-router'
import { ReactRouterAppProvider } from '@toolpad/core/react-router'
import type { Authentication, Navigation } from '@toolpad/core/AppProvider'
import { Person } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import {
    firebaseSignOut,
    onAuthStateChanged,
    signInWithCredentialsDec,
} from './firebase/auth'
import SessionContext, { type Session } from './SessionContext'

export default function App() {
    const { t } = useTranslation()
    const [session, setSession] = React.useState<Session | null>(null)
    const [loading, setLoading] = React.useState(true)

    const sessionContextValue = React.useMemo(
        () => ({
            session,
            setSession,
            loading,
        }),
        [session, loading]
    )

    React.useEffect(() => {
        // Returns an `unsubscribe` function to be called during teardown
        const unsubscribe = onAuthStateChanged((user) => {
            if (user) {
                setSession({
                    user: {
                        name: user.displayName || '',
                        email: user.email || '',
                        image: user.photoURL || '',
                    },
                })
            } else {
                setSession(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const NAVIGATION: Navigation = [
        {
            kind: 'header',
            title: t('Main items'),
        },
        {
            segment: 'home',
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
        title: 'Enterprise App',
    }

    const AUTHENTICATION: Authentication = {
        signIn: signInWithCredentialsDec,
        signOut: firebaseSignOut,
    }

    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
            session={session}
            authentication={AUTHENTICATION}
        >
            <SessionContext.Provider value={sessionContextValue}>
                <Outlet />
            </SessionContext.Provider>
        </ReactRouterAppProvider>
    )
}
