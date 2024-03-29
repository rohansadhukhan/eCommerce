import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message.js'
import { addToCart, removeFromCart } from '../actions/cartAction'


const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        console.log('checkout')
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping cart</h1>
                {cartItems && cartItems.length === 0
                    ? (
                        <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
                    ) : (
                        <ListGroup varient='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={4}>
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>{item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control as='select' value={item.qty} onChange={(e) => {
                                                dispatch(addToCart(item.product, Number(e.target.value)))
                                            }}> {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' varient='light'
                                                onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i></Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup varient='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({
                                cartItems
                                    .reduce((acc, item) => acc + item.qty, 0)
                            }) items</h2>
                            ${cartItems
                                .reduce((acc, item) => acc + item.price * item.qty, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='w-100'
                                varient='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkOutHandler}>Proceed to CheckOut</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
