import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import MyVerticallyCenteredModal from '../components/Modal'
import { getCurrentUser } from '../store/store'
import { useHistory } from 'react-router'

const Signin = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [modalShow, setModalShow] = useState({ show: false, text: '', head: '' });

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            email,
            password
        }

        const res = await fetch('http://localhost:5000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (res.status === 400) {
            const [msg] = data.errors
            setModalShow({ show: true, text: msg.msg, head: 'Warning ⚠' })
        } else {
            const res2 = await fetch('http://localhost:5000/api/auth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': data.token
                },
            })

            const data2 = await res2.json()

            if (res2.status === 400) {
                const [msg] = data.errors
                setModalShow({ show: true, text: msg.msg, head: 'Warning ⚠' })
            } else {
                setModalShow({ show: true, text: 'Login Succesfull 🎉', head: 'Success' })
                localStorage.setItem('TOKEN', data.token)
                dispatch(getCurrentUser(data2.user))
                history.push('/stats')
            }
        }

    }

    return (
        <Container style={{ marginTop: '15vh' }}>
            <h1>Login</h1>
            <Form className="my-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
            <MyVerticallyCenteredModal
                show={modalShow.show}
                onHide={() => setModalShow(false)}
                text={modalShow.text}
                head={modalShow.head}
            />
        </Container>
    )
}

export default Signin
