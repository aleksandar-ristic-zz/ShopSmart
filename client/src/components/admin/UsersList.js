import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allUsers, clearErrors} from '../../actions/userActions'
//import { DELETE_USER_RESET } from '../../constants/userConstants'

import { ImPencil, ImBin } from "react-icons/im"

const UsersList = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector( state => state.allUsers); //const { isDeleted } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

   /*if (isDeleted) {
      alert.success('User has been removed.');
      history.push('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }
  */
  }, [dispatch, alert, error, history]);

   const setUsers= () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc'
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: []
    }

    users.forEach(user => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
        .includes('admin') 
        ? <p style={{ color: '#fa9c23' }}>{user.role}</p> 
        : <p style={{ color: '#00aaff' }}>{user.role}</p>,
        actions:
        <>
          <Link 
          to={`/admin/user/${user._id}`} 
          className="btn btn-warning text-white mr-1" >
            <ImPencil />
          </Link>
          <button className="btn btn-danger">
            <ImBin />
          </button>
        </>
      })
    })

    return data;
  }

  /*const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }
  */
  
  return (
    <>
       <MetaData title={'All Users'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All users</h1>

            {loading ? <Loader /> : (
                 <MDBDataTable 
                  data={setUsers()}
                  className="px-3"
                  busered
                  striped
                  hover
                />
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default UsersList
