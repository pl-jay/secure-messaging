import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { FcGoogle } from 'react-icons/fc'


export default function NewUser({ onIdSubmit }) {
    const idRef = useRef()

    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        onIdSubmit(idRef.current.value)
    }

    function createNewId() {
        onIdSubmit(uuidV4())
        // <Form.Control type="text" ref={idRef} required /><Button onClick={createNewId} variant="secondary" >Create A New Id</Button>
    }

    return (
        <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
            <Form onSubmit={handleSubmit} className="w-100">

                <Form.Group className="">
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        className='mb-3'
                    />

                    <Form.Control
                        placeholder="Date Of Birth"
                        aria-label="Date Of Birth"
                        type='date'
                        className='mb-3'
                    />

                    <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        className='mb-3'
                    />
                    <Form.Control
                        placeholder="Mobile Number"
                        aria-label="Mobile Number"
                        className='mb-3'
                    />

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>

                    <Form.Check type="checkbox" label="I accept all the terms and Conditions" />
                </Form.Group>
                <Button onClick={createNewId} variant="secondary" type="submit" size="lg" className="mr-2" block >Create New Account</Button>
            </Form>
        </Container>
    )
}

