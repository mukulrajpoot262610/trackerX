import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Profile = () => {

    const currentUser = useSelector(state => state.currentUser)

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <Container style={{ marginTop: '15vh' }}>
            <h1>Profile</h1>
            <Container className="my-5">
                <Row lg={4} sm={3}>
                    <Col>
                        <Image src="/images/profile.png" alt="" fluid />
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                        <h1 style={{ fontWeight: '700', color: 'black' }}>{currentUser && currentUser.name}</h1>
                        <h6>{currentUser && currentUser.date}</h6>

                        <Button variant='danger' onClick={handleLogout} className='mt-4'>LogOut</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Profile
