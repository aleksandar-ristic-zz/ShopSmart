import React from 'react'
import { Link } from 'react-router-dom'
import { FaBoxes, FaClipboardList } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const Sidebar = () => {
  return (
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-unstyled components">
            <li>
              <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
            </li>
            
            <li>
              <a
                href="#productSubmenu" 
                data-toggle="collapse" 
                aria-expanded="false" 
                className="dropdown-toggle">
                <FaBoxes className="mr-2" />
                Products
              </a>
              <ul className="collapse list-unstyled" id="productSubmenu">
                <li>
                  <Link to="/admin/products"><FaClipboardList className="mr-1" />All</Link>
                </li>
            
                <li>
                  <Link to="/admin/product"><i className="fa fa-plus"></i> 
                    Create
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
            </li>

            <li>
              <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
            </li>

            
            <li>
              <Link to="/admin/reviews"><MdRateReview className="mr-1" /> Reviews</Link>
            </li>
            
          </ul>
        </nav>
      </div>
  )
}

export default Sidebar
