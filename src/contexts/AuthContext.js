import React, { useContext, useState, useEffect } from "react"
import {
  auth,
  provider,
  signInWithGooglePopUp,
  passwordResetEmail,
  createNewUser,
  signInWithEmail,
  signOutUser
} from "../firebase"
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [id, setId] = useLocalStorage('id', 0)

  function signup(email, password) {
    return createNewUser(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmail(auth, email, password)
  }

  function logout() {
    alert('siginig out')
    return signOutUser(auth)
  }

  function resetPassword(email) {
    return passwordResetEmail(auth, email).then((a) => {

    }).catch((error) => {
      console.log(error)
    })
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function signupWithGoogle() {
    return signInWithGooglePopUp(auth, provider).then((result) => {
      console.log(result)

    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signupWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}