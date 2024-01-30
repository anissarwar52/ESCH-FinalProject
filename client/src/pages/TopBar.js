import React from 'react'
import { Link, NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div>
      <>
      
    {/* <!-- Topbar Start --> */}
    <div className="row py-2 px-lg-5">
            <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center text-white">
                <small>
                  <i className="fa fa-phone-alt mr-2"></i>+92 345 6789
                </small>
                <small className="px-3">|</small>
                <small>
                  <i className="fa fa-envelope mr-2"></i>supply_hub@gmail.com
                </small>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
              <div className="d-inline-flex align-items-center">
                <Link to={"/"} className="text-white px-2">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to={"/"} className="text-white px-2">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to={"/"} className="text-white px-2">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to={"/"} className="text-white px-2">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to={"/"} className="text-white pl-2">
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>

{/* <!-- Topbar End -->*/}
      
            
      </>
    </div>
  )
}
