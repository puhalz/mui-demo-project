import {
    setPersistence,
    browserSessionPersistence,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { firebaseAuth } from './firebaseConfig'

export async function signInWithCredentials(username: string, password: string) {
    try {
        return setPersistence(firebaseAuth, browserSessionPersistence).then(
            async () => {
                const userCredential = await signInWithEmailAndPassword(
                    firebaseAuth,
                    username,
                    password
                )
                return {
                    success: true,
                    user: userCredential.user,
                    error: null,
                }
            }
        )
    } catch (error: any) {
        return {
            success: false,
            user: null,
            error: error.message || 'Failed to sign in with email/password',
        }
    }
}

export async function signInWithCredentialsDec() {
//ToolPad core is not allowing function with params.
//signInWithCredentials will be used in the SignIn - Login.tsx
}

// Sign out functionality
export const firebaseSignOut = async () => {
    try {
        await signOut(firebaseAuth)
        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        }
    }
}

// Auth state observer
export const onAuthStateChanged = (callback: (user: any) => void) => {
    return firebaseAuth.onAuthStateChanged(callback)
}
