import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
    <div>
    <>
    <div className="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
          <div className="row pt-5">
            <div className="col-lg-7 col-md-6">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h3 className="text-primary mb-4">Get In Touch</h3>
                  <p>
                    <i className="fa fa-map-marker-alt mr-2"></i>123 Street,
                    Islamabad, Pakistan
                  </p>
                  <p>
                    <i className="fa fa-phone-alt mr-2"></i>+092 345 67890
                  </p>
                  <p>
                    <i className="fa fa-envelope mr-2"></i>supply_hub@gmail.com
                  </p>
                  <div className="d-flex justify-content-start mt-4">
                    <Link to ={'/'}
                      className="btn btn-outline-light btn-social mr-2"

                    >
                      <i className="fab fa-twitter"></i>
                    </Link>
                    <Link to={'/'}
                      className="btn btn-outline-light btn-social mr-2"

                    >
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                    <Link to ={'/'}
                      className="btn btn-outline-light btn-social mr-2"
                     
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                    <Link to = {'/'} className="btn btn-outline-light btn-social">
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 mb-5">
                  <h3 className="text-primary mb-4">Quick Links</h3>
                  <div className="d-flex flex-column justify-content-start">
                    <Link to= {'/'} className="text-white mb-2" href="/index.html">
                      <i className="fa fa-angle-right mr-2"></i>Home
                    </Link>
                    <Link to= {'/about'} className="text-white mb-2" href="/about.html">
                      <i className="fa fa-angle-right mr-2"></i>About Us
                    </Link>
                    <Link to= {'/service'} className="text-white mb-2" href="/service.html">
                      <i className="fa fa-angle-right mr-2"></i>Our Services
                    </Link>
                    <Link to= {'/contact'} className="text-white" href="/contact.html">
                      <i className="fa fa-angle-right mr-2"></i>Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 mb-5">
              <h3 className="text-primary mb-4">Newsletter</h3>
              <p>
                Stay up-to-date with our latest news and updates by subscribing
                to our newsletter. We'll send you regular updates on our
                services, product releases, and industry insights. Don't miss
                out on the latest trends in global supply chain management.
                Subscribe now!
              </p>
            </div>
          </div>
        </div>
        <div
          className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5"
          style={{ borderColor: "#3E3E4E" }}
        >
          <div className="row">
            <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
              <p className="m-0 text-white">
                &copy; <Link to={'/'} >2023 - Enterprise Supply Chain Hub</Link>. All
                Rights Reserved.{" "}
              </p>
            </div>
            <div className="col-lg-6 text-center text-md-right">
              <ul className="nav d-inline-flex">
                <li className="nav-item">
                  <Link to ={'/'} className="nav-link text-white py-0">
                    Privacy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/service'} className="nav-link text-white py-0">
                    Terms
                  </Link>
                </li>
                <Link to={'/contact'} className="nav-item">
                  <a className="nav-link text-white py-0">
                    FAQs
                  </a>
                </Link>
                <li className="nav-item">
                <Link to={'/contact'} className="nav-link text-white py-0">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
