import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from 'react-icons/fc'
import { v4 as uuidV4 } from 'uuid'

export default function Login({ onIdSubmit }) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, signupWithGoogle } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const idRef = useRef()


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      onIdSubmit(uuidV4())
      navigate('../', { replace: true })
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  async function handleGoogleSignIn() {
    try {
      setError("")
      setLoading(true)
      await signupWithGoogle()
      onIdSubmit(uuidV4())
      navigate('../', { replace: true })
    } catch {
      setError("Failed to create an account")
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>


        <Button variant="light" size="lg" onClick={handleGoogleSignIn} className="mb-5 w-100" >
          <FcGoogle className='mb-1 mr-1' />  Log in with Google
        </Button>
        <Card>
          <Card.Body>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="mt-5">
              <Form.Group id="email">
                <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className="mt-4">
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Password
                </Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
                <Link to="/forgot-password" className="w-100">Forgot Password?</Link>
              </Form.Group>
              <Button disabled={loading} className="mt-5 w-100" type="submit">
                Log In
              </Button>
            </Form>

          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  )
}


// import React, { useRef } from 'react'
// import { Container, Form, Button } from 'react-bootstrap'
// import { v4 as uuidV4 } from 'uuid'
// import { FcGoogle } from 'react-icons/fc'

// export default function Login({ onIdSubmit }) {
//   const idRef = useRef()

//   function handleSubmit(e) {
//     e.preventDefault()

//     onIdSubmit(idRef.current.value)
//   }

//   function createNewId() {
//     onIdSubmit(uuidV4())
//   }

//   return (
//     <>


//       <Container className="align-items-center d-flex" style={{ height: '100vh' }}>

//         <Form onSubmit={handleSubmit} className="w-100">

//           <Form.Group className="">
//             <Form.Control
//               placeholder="Username"
//               aria-label="Username"
//               className='mb-3'
//             />

//             <Form.Control
//               placeholder="Password"
//               aria-label="Password"
//               className='mb-3'
//             />
//             <Form.Check type="checkbox" label="Remember Me" />
//           </Form.Group>
//           <Button type="submit" size="lg" className="mr-2" block>Login</Button>
//           <Button variant="outline-dark" size="lg" className="mt-2" block>
//             <FcGoogle className='mb-1 mr-1' />  Google Login
//           </Button>

//           <Button variant="outline-dark" type="submit" size="lg" className="mt-4" onClick={createNewId} block> New User</Button>
//         </Form>
//       </Container>
//     </>


//   )
// }

