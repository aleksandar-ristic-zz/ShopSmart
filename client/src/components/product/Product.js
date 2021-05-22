import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ col, product: {
  _id,
  name,
  images,
  numOfReviews,
  price,
  ratings
}}) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
    <div className="card p-3 rounded">
      <img
        className="card-img-top mx-auto"
        src={images[0].url} alt={name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link to={`/product/${_id}`}>{name}</Link>
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" 
            style={{ width: `${(ratings/5) * 100}%` }}></div>
          </div>
          <span id="no_of_reviews">{numOfReviews}</span>
        </div>
        <p className="card-text">{price}</p>
        <Link to={`/product/${_id}`} id="view_btn" className="btn btn-block">View Details</Link>
      </div>
    </div>
  </div>
  )
}

export default Product
