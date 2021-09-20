import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Loading = () => {

    const auth = useSelector(state => state.isAuth)
    const userData = useSelector(state => state.currentUser)

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1 className="mb-5">Welcome Here 🎉</h1>
            <Container className="mx-auto text-center">
                {
                    auth ? <h2 style={{ fontWeight: '700' }} >{userData.name}</h2> : (<><LinkContainer to="/signup" className="m-2">
                        <Button>Register Now</Button>
                    </LinkContainer>
                        <LinkContainer to="signin" className="m-2">
                            <Button>Login Now</Button>
                        </LinkContainer>
                    </>)
                }
            </Container>
        </div>
    )
}

export default Loading
