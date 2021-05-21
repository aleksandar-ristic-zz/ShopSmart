import React, { useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'

import  MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert'

const Home = ({ match }) => {

  const keyword = match.params.keyword
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { 
    loading, 
    products, 
    error, 
    resPerPage,
    productsCount
  } = useSelector( state => state.products);

  useEffect(() => {
    console.log(error);
    if(error) {
    return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage));

  }, [dispatch, alert, error, keyword, currentPage]);


  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo)
  }

  return (
    <>
    {loading ? <Loader /> : (
      <>
       <MetaData title={'Best place for online shopping'} />
         <h1 id="products_heading">Latest Products</h1>
   
         <section id="products" className="container mt-5">
           <div className="row">
               {products && products.map(product => (
                 <Product key={product._id} product={product} />
               ))}
           </div>
         </section>


    { resPerPage <= productsCount && (
       <div className="d-flex justify-content-center mt-5">
       <Pagination
         activePage={currentPage}
         itemsCountPerPage={resPerPage}
         totalItemsCount={productsCount}
         onChange={setCurrentPageNo}
         nextPageText ={'Next'}
         prevPageText ={'Prev'}
         firstPageText={'First'}
         lastPageText={'Last'}
         itemClass="page-item"
         linkClass="page-link"
       />
     </div>
    )}

    </>
    )}
    </>
  )
}

export default Home
