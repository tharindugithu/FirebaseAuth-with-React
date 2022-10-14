import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase' //using curly brackets beacuse of named expost not a default export 
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsub
    }, [])
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

