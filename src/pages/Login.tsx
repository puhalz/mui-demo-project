'use client'
import * as React from 'react'
import { SignInPage } from '@toolpad/core/SignInPage'
import LinearProgress from '@mui/material/LinearProgress'
import { Navigate, useNavigate, useNavigation } from 'react-router'
import { useSession, type Session } from '../SessionContext'
import { signInWithCredentials } from '../firebase/auth'
import DOMPurify from 'dompurify'

type SignInResult = {
    success: boolean
    user: any // You can replace `any` with a specific user type if needed (e.g., `firebase.User`)
    error: string | null
}

export default function SignIn() {
    const { session, setSession, loading } = useSession()
    const navigate = useNavigate()

    if (loading) {
        return <LinearProgress />
    }

    if (session) {
        return <Navigate to="/home" />
    }

    return (
        <SignInPage
            providers={[{ id: 'credentials', name: 'Credentials' }]}
            signIn={async (provider, formData, callbackUrl = '/home') => {
                let result: SignInResult = {
                    success: false,
                    user: null,
                    error: 'Unexpected error',
                } // Default value for result

                try {
                    if (provider.id === 'credentials') {
                        let email = formData?.get('email') as string
                        let password = formData?.get('password') as string

                        email = DOMPurify.sanitize(email)
                        password = DOMPurify.sanitize(password)

                        if (!email || !password) {
                            return { error: 'Email and password are required' }
                        }

                        result = await signInWithCredentials(email, password)
                    }

                    if (result?.success && result?.user) {
                        // Convert Firebase user to Session format
                        const userSession: Session = {
                            user: {
                                name: result.user.displayName || '',
                                email: result.user.email || '',
                                image: result.user.photoURL || '',
                            },
                        }
                        setSession(userSession)
                        console.log('Navigate to Home', navigate)

                        navigate(callbackUrl || '', { replace: true })
                    }
                    return { error: result?.error || 'Failed to sign in' }
                } catch (error) {
                    return {
                        error:
                            error instanceof Error
                                ? error.message
                                : 'An error occurred',
                    }
                }
            }}
        />
    )
}
