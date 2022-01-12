import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { FcGoogle } from 'react-icons/fc'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, signupWithGoogle } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [agree, setAgree] = useState(true)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            console.log('wait')
            await signup(emailRef.current.value, passwordRef.current.value)
            console.log('done')
            navigate('../', { replace: true })
        } catch (error) {
            setError("Failed to create an account")
            console.log(error)
        }

        setLoading(false)
    }

    async function handleGoogleSignIn() {
        try {
            setError("")
            setLoading(true)
            console.log('wait')
            await signupWithGoogle()
            console.log('done')
            navigate('../', { replace: true })
        } catch {
            setError("Failed to create an account")
        }
    }

    async function changeTermsAgreement() {
        setAgree(!agree)
    }

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>

                <Button variant="light" size="lg" className="mb-5 w-100" onClick={handleGoogleSignIn} >
                    <FcGoogle className='mb-1 mr-1' />  Sign up with Google
                </Button>
                <Card>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email" className="mt-3">
                                <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password" className="mt-3">
                                <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm" className="mt-3">
                                <Form.Label style={{ fontWeight: 'bold' }}>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Form.Group className="mt-3 mb-4">
                                <Form.Check type="checkbox" onClick={changeTermsAgreement} label="I accept all the terms and Conditions" />
                            </Form.Group>
                            <Button disabled={agree || loading} className="w-100" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </Container>
    )
}