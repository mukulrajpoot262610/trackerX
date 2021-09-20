import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import { CSVLink, CSVDownload } from "react-csv";


const NavbarC = () => {

    const auth = useSelector(state => state.isAuth)
    const userData = useSelector(state => state.currentUserData)

    const csvData = userData.map((e, index) => {
        return {
            "Number": index + 1,
            "Transaction Name": e.transaction_name,
            "Transaction Date": e.transaction_date,
            "Transaction Amount": `₹${e.transaction_expense_amount > 0 ? e.transaction_expense_amount : e.transaction_income_amount}`,
            "Transaction Type": e.transaction_type,
            "Transaction_year": e.transaction_year
        }
    })

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <Navbar bg="light" expand="lg" style={{ position: 'fixed', width: '100%', top: '0', zIndex: '100' }}>
            <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Nav>
                    <LinkContainer to="/">
                        <Navbar.Brand style={{ fontFamily: 'initial', fontWeight: '700' }}>TrackerX</Navbar.Brand>
                    </LinkContainer>
                </Nav>
                <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        auth ? (<Nav >
                            <LinkContainer to="/stats" className="m-2">
                                <Button><i className="far fa-chart-bar" style={{ fontSize: '20px' }}></i></Button>
                            </LinkContainer>
                            <LinkContainer to='/add' className="m-2">
                                <Button><i className="fas fa-plus-circle" style={{ fontSize: '20px' }}></i></Button>
                            </LinkContainer>
                            <LinkContainer to='/profile' className="m-2">
                                <Button><i className="fas fa-user" style={{ fontSize: '20px' }}></i></Button>
                            </LinkContainer>
                            <LinkContainer to='/movements' className="m-2">
                                <Button className="m-2"><i className="fab fa-buffer" style={{ fontSize: '20px' }}></i></Button>
                            </LinkContainer>

                            <CSVLink data={csvData}>
                                <Button className="m-2"><i className="fas fa-file-csv" style={{ fontSize: '20px' }}></i></Button>
                            </CSVLink>
                            <CSVDownload data={csvData} target="_blank" />

                            <Button variant='danger' className="m-2" onClick={handleLogout} ><i className="fas fa-power-off" style={{ fontSize: '20px' }}></i></Button>
                        </Nav>) : (<Nav className="ml-auto">
                            <LinkContainer to="/signup" className="m-2">
                                <Button>Register Now</Button>
                            </LinkContainer>
                            <LinkContainer to="signin" className="m-2">
                                <Button>Login Now</Button>
                            </LinkContainer>
                        </Nav>)
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarC
