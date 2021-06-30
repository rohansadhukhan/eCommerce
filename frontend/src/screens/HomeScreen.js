import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction.js'
import Product from '../components/Product'
import { Row, Col, Pagination } from 'react-bootstrap'
import Paginate from '../components/Paginate.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'

const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <h1> Latest Products</h1>
            {loading
                ? (
                    <Loader />
                ) : error
                    ? (
                        <Message>{error}</Message>
                    ) : (products &&
                        <>
                            <Row>
                                {products.map(product => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <Paginate
                                pages={pages}
                                page={page}
                                keyword={keyword ? keyword : ''} />
                        </>
                    )
            }
        </>
    )
}

export default HomeScreen
