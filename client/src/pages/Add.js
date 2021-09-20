import React, { useState } from 'react'
import MyVerticallyCenteredModal from '../components/Modal'
import { Container, Button, Form } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom'

const Add = () => {

    // const history = useHistory()
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [date, setDate] = useState()
    const [type, setType] = useState()
    const [modalShow, setModalShow] = useState({ show: false, text: '', head: '' });
    const newData = date && date.split('-')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            transaction_name: name,
            transaction_income_amount: type === 'Income' ? (1 * amount) : 0,
            transaction_expense_amount: type === 'Expense' ? (1 * amount) : 0,
            transaction_date: date,
            transaction_type: type,
            transaction_month: newData[1],
            transaction_year: newData[0],
        }

        const res = await fetch('http://localhost:5000/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('TOKEN')
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (res.status === 400) {
            const [msg] = data.errors
            setModalShow({ show: true, text: msg.msg, head: 'Warning ⚠' })
        } else {
            setModalShow({ show: true, text: 'Added Succesfully 🎉', head: 'Success' })
        }
    }

    return (
        <Container style={{ marginTop: '15vh' }} >
            <h1 className="my-5">Add Income or Expense</h1>
            <Form onSubmit={handleSubmit} className="my-5">
                <Form.Group className="mb-3">
                    <Form.Label>Add Transaction Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Enter Amount</Form.Label>
                    <Form.Control type="number" placeholder="Enter Amount" onChange={e => setAmount(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="" onChange={e => setDate(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Transaction Type</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Expense"
                        name="formHorizontalRadios"
                        value="Expense"
                        onChange={e => setType(e.target.value)}
                    />
                    <Form.Check
                        type="radio"
                        label="Income"
                        name="formHorizontalRadios"
                        value="Income"
                        onChange={e => setType(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
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

export default Add
