import asyncHandler from 'express-async-handler'
import Order from '../models/Order'

// @desc        Create new Order
// @route       POST api/orders
// @access      private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('no order items')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }
})

export { addOrderItems }