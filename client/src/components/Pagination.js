import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationC = ({ postPerPage, totalPosts, paginate }) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <Pagination>
            {
                pageNumbers.map((number) => <Pagination.Item onClick={() => paginate(number)} key={number}>{number}</Pagination.Item>)
            }
        </Pagination>
    )
}

export default PaginationC
