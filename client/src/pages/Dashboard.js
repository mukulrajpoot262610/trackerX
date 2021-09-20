import React, { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import MyVerticallyCenteredModal from '../components/Modal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { setCurrentUserData, setDynamicData, getDataByYear } from '../store/store'

const Dashboard = () => {

    const dispatch = useDispatch()

    // REDUX DATA
    const user = useSelector(state => state.currentUser)
    const userData = useSelector(state => state.currentUserData)
    const DYNAMIC_DATA = useSelector(state => state.dynamicData)

    // COMPONENT STATE
    const [modalShow, setModalShow] = useState({ show: false, text: '', head: '' });
    const [year, setYear] = useState(new Date().getFullYear())

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/api/data/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': localStorage.getItem('TOKEN')
                }
            })

            const data = await res.json()

            if (res.status === 400) {
                const [msg] = data.errors
                setModalShow({ show: true, text: msg.msg, head: 'Warning ⚠' })
            } else {
                dispatch(setCurrentUserData(data.data))
                dispatch(setDynamicData(data.data))
                dispatch(getDataByYear(new Date().getFullYear()))
            }
        }
        fetchData()
    }, [user, dispatch])

    // CALCULATING NET INCOME AND NET EXPENSE
    const netIncome = (userData && userData.map((e) => e.transaction_income_amount).reduce((a, b) => a + b, 0))
    const netExpense = (userData && userData.map((e) => e.transaction_expense_amount).reduce((a, b) => a + b, 0))
    const netBalance = netIncome - netExpense

    // CALCULATING INCOME AND EXPENSE YEARLY
    const netIncome2 = (DYNAMIC_DATA && DYNAMIC_DATA.map((e) => e.income).reduce((a, b) => a + b, 0))
    const netExpense2 = (DYNAMIC_DATA && DYNAMIC_DATA.map((e) => e.expense).reduce((a, b) => a + b, 0))
    const netBalance2 = netIncome2 - netExpense2

    // HANDLING DUPLICATED YEARS
    const yearArray = userData && userData.map((e) => e.transaction_year).sort()
    const deduped = [...new Set(yearArray)]

    // HANDLING YEARS
    const handleYears = (e) => {
        setYear(e)
        dispatch(getDataByYear(e))
    }

    return (
        <Container style={{ marginTop: '15vh' }}>
            <h1 className='my-3'>DashBoard</h1>
            <Container className='my-3'>
                {
                    deduped && deduped.map((e, index) => <Button
                        key={index}
                        variant='warning'
                        onClick={() => handleYears(e)}
                    >
                        {e}
                    </Button>)
                }
                <Container className='my-5' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Card style={{ width: '18rem', margin: '10px' }}>
                        <Card.Header className='text-warning'>Net Balance</Card.Header>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>₹{netBalance}</h1>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', margin: '10px' }}>
                        <Card.Header className='text-success'>Net Income</Card.Header>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>₹{netIncome}</h1>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', margin: '10px' }}>
                        <Card.Header className='text-danger'>Net Expense</Card.Header>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>₹{netExpense}</h1>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '100%', margin: '10px' }}>
                        <Card.Header className='text-warning'>Showing Data of year {year}</Card.Header>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }} className="mb-5">₹{netBalance2}</h1>
                            <ResponsiveContainer width="100%" height="80%">
                                <LineChart width={730} height={250} data={DYNAMIC_DATA}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#43cc64" />
                                    <Line type="monotone" dataKey="expense" stroke="#e52563" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', margin: '10px' }}>
                        <Card.Header className='text-warning'>Net Balance of {year}</Card.Header>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>₹{netBalance2}</h1>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem', margin: '10px' }}>
                        <Card.Header className='text-success'>Income In {year}</Card.Header>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>₹{netIncome2}</h1>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem', margin: '10px' }}>
                        <Card.Header className='text-danger'>Expense In {year}</Card.Header>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>₹{netExpense2}</h1>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>

            <MyVerticallyCenteredModal
                show={modalShow.show}
                onHide={() => setModalShow(false)}
                text={modalShow.text}
                head={modalShow.head}
            />
        </Container>
    )
}

export default Dashboard
