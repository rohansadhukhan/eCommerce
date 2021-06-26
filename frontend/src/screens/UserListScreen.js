import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { deleteUsers, listUsers } from '../actions/userAction.js'

const UserListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteUsers(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message varient='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }} />
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }} />
                                )}</td>
                                <td>
                                    <LinkContainer to={`/api/users/${user._id}/edit`}>
                                        <Button varient='light' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button varient='' className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}><i className='fas fa-trash'></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

        </>
    )
}

export default UserListScreen
