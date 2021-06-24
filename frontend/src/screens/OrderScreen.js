import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message.js'
import { getOrderDetails } from '../actions/orderAction'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price, 0))
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    // useEffect(() => {
    //     if(!order || order._id !== orderId) {
    //         dispatch(getOrderDefails(orderId))
    //     }
    // }, [order, orderId]) 

    return loading ? (
        <Loader />
    ) : error ? (
        <Message varient='danger'>{error}</Message>
    ) : (
        <>
            <h1>Order Details {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup varient='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country},
                            </p>
                            {order.isDeliverd ? <Message varient='success'>Delivered On{order.deliveredAt}</Message>
                                : <Message varient='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method:</strong> : {order.paymentMethod} </p>
                            {order.isPaid ? <Message varient='success'>Paid On{order.paidAt}</Message>
                                : <Message varient='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0
                                ? (<Message>Your order is empty</Message>)
                                : (<ListGroup>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>{item.qty} X {item.price} = {item.qty * item.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>)}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup varient='flush'>
                            <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
