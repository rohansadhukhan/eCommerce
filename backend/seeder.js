import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {

        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data imported'.green.inverse)
        process.exit()

    } catch (error) {
        console.log('Data imported'.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {

        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log('Data destroyed'.red.inverse)
        process.exit()

    } catch (error) {
        console.log('Data imported'.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}