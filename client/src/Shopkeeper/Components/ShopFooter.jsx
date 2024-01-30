import React from 'react';
import PlayStore from '../../Images/playstore.JPG'
import Appstore from '../../Images/appstore.jpg'
import Cart from '../../Images/cart.png'
import './Style/Footer.css'

export default function ShopFooter() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col-1">
            <h3 className='h3'>Download our App</h3>
            <p>Download the app for Android and iOS mobile phones.</p>
            <div className="app-logo">
              <img src={PlayStore} alt="Google Play Store" />
              <img src={Appstore} alt="Apple App Store" />
            </div>
          </div>

          <div className="footer-col-2">
          <div className="logo">
            <p>Smart <span>POS</span></p>
          </div>
            <p>Our purpose is to make the pleasure and benefits of sports accessible to many in a sustainable way.</p>
          </div>

          <div className="footer-col-3">
            <h3>Useful Links</h3>
            <ul>
              <li>Coupons</li>
              <li>Blog Posts</li>
              <li>Return Policy</li>
              <li>Join Affiliate Program</li>
            </ul>
          </div>

          <div className="footer-col-4">
            <h3>Follow Us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">&copy; Copyright 2023 - All rights reserved</p>
      </div>
    </div>
  );
}
