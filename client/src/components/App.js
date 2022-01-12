import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import TopNavBar from './TopNavBar';

import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  const [id, setId] = useLocalStorage('id', 0)
  const AuthM = (

    <AuthProvider>
      <Router>
        <TopNavBar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SocketProvider id={id}>
                  <ContactsProvider>
                    <ConversationsProvider id={id}>
                      <Dashboard id={id} />
                    </ConversationsProvider>
                  </ContactsProvider>
                </SocketProvider>
              </PrivateRoute>
            }
          >
          </Route>
          <Route
            path="/update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          >
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onIdSubmit={setId} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
  return (
    AuthM
  )
}

export default App;
