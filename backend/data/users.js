import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'admin',
        email: 'admin@email.com',
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true
    },
    {
        name: 'rohan',
        email: 'rohan@email.com',
        password: bcrypt.hashSync('1234', 10),
    }
]

export default users