import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allOrders, deleteOrder, clearErrors} from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

import { ImEye, ImBin } from "react-icons/im"

const OrdersList = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector( state => state.allOrders);
  const { isDeleted } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

   if (isDeleted) {
      alert.success('Order has been removed.');
      history.push('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET });
    }
  
  }, [dispatch, alert, error, history, isDeleted]);

  const setOrders= () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'No of Items',
          field: 'numOfItems',
          sort: 'asc'
        },
         {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
         {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
         {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: []
    }

    orders.forEach(order => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: order.orderStatus && String(order.orderStatus)
        .includes('Delivered') 
        ? <p style={{ color: 'green' }}>{order.orderStatus}</p> 
        : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
        actions:
        <>
          <Link 
          to={`/admin/order/${order._id}`} 
          className="btn btn-primary mr-1" >
            <ImEye />
          </Link>
          <button className="btn btn-danger" onClick={() => deleteOrderHandler(order._id)}>
            <ImBin />
          </button>
        </>
      })
    })

    return data;
  }

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }

  return (
    <>
      <MetaData title={'All Orders'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All products</h1>

            {loading ? <Loader /> : (
                 <MDBDataTable 
                  data={setOrders()}
                  className="px-3"
                  bordered
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

export default OrdersList
