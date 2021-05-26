import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts, clearErrors } from '../../actions/productActions'

import { ImPencil, ImBin } from "react-icons/im";

const ProductsList = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector( state => state.products );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setProducts= () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
         {
          label: 'Price',
          field: 'price',
          sort: 'asc'
        },
         {
          label: 'Stock',
          field: 'stock',
          sort: 'asc'
        },
         {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: []
    }

    products.forEach(product => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        actions:
        <>
          <Link 
          to={`/admin/product/${product._id}`} 
          className="btn btn-primary mr-1" >
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

  return (
    <>
      <MetaData title={'All Products'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All products</h1>

            {loading ? <Loader /> : (
              <>
                 <MDBDataTable 
                  data={setProducts()}
                  className="px-3"
                  bordered
                  striped
                  hover
                  />
              </>
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default ProductsList
