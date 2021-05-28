import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { getProductReviews, deleteReview, clearErrors} from '../../actions/productActions'

import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

import { ImBin } from "react-icons/im"

const ProductReviews = () => {

  const [productId, setProductId] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, reviews } = useSelector( state => state.productReviews);

  const {isDeleted, error: deleteError } = useSelector(state => state.review)

  useEffect(() => {
   
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.errror(deleteError);
      dispatch(clearErrors());
    }

    if (productId !== '') {
       dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      alert.success('Review has been removed.');
      dispatch({ type: DELETE_REVIEW_RESET });
    }

  }, [dispatch, alert, error, deleteError, isDeleted, productId]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  }

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  }

   const setReviews= () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc'
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc'
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: []
    }

    reviews.forEach(review => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions:
          <button className="btn btn-danger" onClick={() => deleteReviewHandler(review._id)}>
            <ImBin />
          </button>
      })
    })

    return data;
  }

  return (
    <>
       <MetaData title={'Product Reviews'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
          <div className="row justify-content-center mt-5">
            <div className="col-5">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="email_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                </div>

                <button
                  id="search_button"
                  type="submit"
                  className="btn btn-primary btn-block py-2"
                >
                  SEARCH
                </button>
              </ form>
            </div>  
          </div>

          {reviews && reviews.length > 0 ? (
            <MDBDataTable 
              data={setReviews()}
              className="px-3"
              bordered
              striped
              hover
            />
          ) : (
          <p className="mt-5 text-center lead">
            No Reviews. Yet.
          </p>
          )}
          </>
        </div>
      </div> 
    </>
  )
}

export default ProductReviews
