import React, { useState } from 'react'
import { Container, Button, Card, Row, Col, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import PaginationC from '../components/Pagination'

const Movements = () => {

    const userData = useSelector(state => state.currentUserData)
    const [filteredData, setFilteredData] = useState(userData)
    const [postPerPage, setPostPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const handleAll = () => {
        setFilteredData(userData)
    }
    const handleIncome = () => {
        const newData = userData.filter((e) => e.transaction_type === 'Income')
        setFilteredData(newData)
    }
    const handleExpense = () => {
        const newData = userData.filter((e) => e.transaction_type === 'Expense')
        setFilteredData(newData)
    }

    const netIncome = (userData && userData.map((e) => e.transaction_income_amount).reduce((a, b) => a + b, 0))
    const netExpense = (userData && userData.map((e) => e.transaction_expense_amount).reduce((a, b) => a + b, 0))
    const netBalance = netIncome - netExpense

    // PAGINATION
    const indexOfLastItem = currentPage * postPerPage;
    const indexOfFirstItem = indexOfLastItem - postPerPage
    const currentPost = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return (
        <Container style={{ marginTop: '15vh' }}>
            <Container className='my-3 mb-5' >
                <h1 className='my-5'>Transactions</h1>
                <Container className='my-3'>
                    <Button onClick={handleAll}>All</Button>
                    <Button onClick={handleIncome} className='mx-2'>Income</Button>
                    <Button onClick={handleExpense}>Expense</Button>
                </Container>
                <Card className='mt-5' style={{ height: 'max-content', overflowY: 'auto' }}>
                    {
                        filteredData && userData.length > 0 ? currentPost.map((e) => (<Card style={{ width: '98%', margin: '10px' }} key={e._id}>
                            <Card.Header
                                className={e.transaction_type === 'Expense' ? "text-danger" : "text-success"}>
                                {e.transaction_type}
                                <Badge className='text-muted'>{e.transaction_year}</Badge>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg={10}>
                                        <h1
                                            style={{ fontWeight: '700' }}>
                                            {e.transaction_name}
                                        </h1>
                                        <h6
                                            style={{ fontWeight: '700' }}>
                                            {e.transaction_date}
                                        </h6>
                                    </Col>
                                    <Col className="ml-auto" lg={2}>
                                        <h1 style={{ fontWeight: '700' }} >₹{e.transaction_expense_amount > 0 ? e.transaction_expense_amount : e.transaction_income_amount}</h1>
                                        <h6>₹</h6>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>))
                            : "No Data"}
                </Card>
                <PaginationC postPerPage={postPerPage} totalPosts={filteredData.length} paginate={paginate} />
            </Container>
        </Container>
    )
}

export default Movements
