import React, { useState, useEffect, useContext  } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import Footer from "./Footer";


export default function Index() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('/admin/products/latest');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products.');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <>
        {/* <!-- Topbar Start --> */}
        <div className="container-fluid bg-dark">
          <TopBar/>
        </div>
        {/* <!-- Topbar End -->
    
    <!-- Navbar Start --> */}
        <div className="container-fluid p-0">
        <Navbar/>
        </div>
        {/* <!-- Navbar End -->


    <!-- Header Start --> */}
        <div className="jumbotron jumbotron-fluid mb-5">
          <div className="container text-center py-5">
            <h1 className="text-primary mb-4">
              Integrated Global Supply Chain Solution
            </h1>
            <h1 className="text-white display-3 mb-5">Handling Service</h1>
            <div
              className="mx-auto"
              style={{ width: "100%", maxWidth: "600px" }}
            ></div>
          </div>
        </div>
        {/* <!-- Header End -->


    <!-- About Start --> */}
        <div className="container-fluid py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 pb-4 pb-lg-0">
                <img
                  className="img-fluid w-100"
                  src="assets/img/about.jpg"
                  alt=""
                />
                <div className="bg-primary text-dark text-center p-4">
                  <h3 className="m-0">Automated Solution</h3>
                </div>
              </div>
              <div className="col-lg-7">
                <h6 className="text-primary text-uppercase font-weight-bold">
                  About Us
                </h6>
                <h1 className="mb-4">End-to-end supply chain solutions</h1>
                <p className="mb-4">
                  At Enterprise Supply Chain Hub, we specialize in providing
                  comprehensive supply chain solutions for businesses of all
                  sizes. With a team of experienced professionals and advanced
                  technology, we help our clients optimize their supply chain
                  processes and improve their bottom line. Our mission is to
                  provide reliable and efficient supply chain services that
                  enable businesses to focus on their core operations and
                  achieve their goals. We believe in building long-term
                  relationships with our clients based on trust, integrity, and
                  commitment to excellence. Whether you're a small startup or a
                  large corporation, we have the expertise and resources to meet
                  your unique supply chain needs. Contact us today to learn how
                  we can help you streamline your operations and achieve
                  success.
                </p>
                <Link
                  to='/about'
                  className="btn btn-primary mt-3 py-2 px-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- About End -->


    <!--  Quote Request Start --> */}
        <div className="container-fluid bg-secondary my-5">
          <div className="container">
            <div className="row align-items-center" style={{padding: '45px 45px'}}>
              <div className="col-lg-7 py-5 py-lg-0">
                <h6 className="text-primary text-uppercase font-weight-bold">
                  Get A Quote
                </h6>
                <h1 className="mb-4">Request A Free Quote</h1>
                <p className="mb-4">
                  At Enterprise Supply Chain, we're dedicated to providing the
                  best possible service to our clients. That's why we offer free
                  quotes for all of our services, so you can get an accurate
                  idea of what to expect. Our team of experts will work with you
                  to understand your specific needs and provide a customized
                  solution that fits your budget. Whether you need help with
                  transportation or warehousing, we've got you covered. Contact
                  us today to request your free quote and take the first step
                  towards optimizing your supply chain.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* <!-- Quote Request Start -->


    <!-- Features Start --> */}
        <div className="container-fluid pt-5">
          <div className="container">
            <div className="text-center pb-2">
              <h6 className="text-primary text-uppercase font-weight-bold">
                Our Website's Features
              </h6>
              <h2 className="mb-4">Enterprise Supply Chain Hub Services</h2>
            </div>
            <div className="row pb-3" style={{alignItems: 'normal'}}>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-boxes text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Products Management
                  </h6>
                </div>
                <p>
                  Streamline supply chain process and make informed decisions
                  regarding product supply and demand.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-chart-line text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Trend Forecasting
                  </h6>
                </div>
                <p>
                  Analyze product data and provide insights into emerging
                  trends, allowing companies to adjust their strategies
                  accordingly.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-users text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Salesteam Monitoring
                  </h6>
                </div>
                <p>
                  Track and monitor sales team performance, ensuring exceptional
                  results.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-chart-bar text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Performance Analytics
                  </h6>
                </div>
                <p>
                  Our platform can provide detailed insights into sales
                  performance, including sales trends, conversion rates, and
                  other important metrics, helping businesses make data-driven
                  decisions.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-comment-alt text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Feedback Option
                  </h6>
                </div>
                <p>
                  Gather feedback to recommend better products and report any
                  problems with the product.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-list-alt text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Product listing demand
                  </h6>
                </div>
                <p>
                  The platform shall list products based on their demand and
                  help manage the inventory of companies, distributors, sales
                  teams, and shopkeepers.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-truck text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Distributors management
                  </h6>
                </div>
                <p>
                  Identify most demanded products, manage inventory, sales team,
                  employees, and shopkeepers.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center mb-5">
                <div className="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                  <i className="fa fa-2x fa-clipboard-list text-dark pr-3"></i>
                  <h6 className="text-white font-weight-medium m-0">
                    Order Management
                  </h6>
                </div>
                <p>
                  Streamline your order fulfillment process with efficient
                  inventory management, and automated order processing, allowing
                  you to meet customer demands with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Features End -->


    <!-- Features11 Start --> */}
        <div className="container-fluid bg-secondary my-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <img
                  className="img-fluid w-100"
                  src="assets/img/feature.jpg"
                  alt=""
                />
              </div>
              <div className="col-lg-7 py-5 py-lg-0">
                <h6 className="text-primary text-uppercase font-weight-bold">
                  Why Choose Us
                </h6>
                <h1 className="mb-4">
                  Enterprise Supply Chain Hub, All-in-One Solution
                </h1>
                <p className="mb-4">
                  At Enterprise Supply Chain Hub, we provide an all-in-one
                  solution to address the challenges faced by global supply
                  chain management systems. Here are a few reasons why you
                  should choose us:
                </p>
                <ul className="list-inline">
                  <li>
                    <h6>
                      <i className="far fa-dot-circle text-primary mr-3"></i>
                      Global Service
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="far fa-dot-circle text-primary mr-3"></i>On
                      time Delivery
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="far fa-dot-circle text-primary mr-3"></i>
                      24/7 Customer Support
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="far fa-dot-circle text-primary mr-3"></i>
                      Integrated and Unified Platform
                    </h6>
                  </li>
                  <li>
                    <h6>
                      <i className="far fa-dot-circle text-primary mr-3"></i>
                      Cost-effective and Efficient
                    </h6>
                  </li>
                </ul>
                <Link
                 to='/service'
                  className="btn btn-primary mt-3 py-2 px-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Features11 End -->*/}


{/* product Start */}

 <div className="container-fluid pt-5">
          <div className="container">
            <div className="text-center pb-2">
              <h6 className="text-primary text-uppercase font-weight-bold">
                Our Products
              </h6>
              <h1 className="mb-4">Latest Products</h1>
            </div>

            <div className="cardContainer1">
            {products.map((item) => (
              <div key={item._id} className="card1" style={{marginLeft: '47px', flexBasis: '21%'}}>
                <div className="cardImage">
                  <img src={`http://localhost:4000/${item?.imageUrl}`} alt={item.title} />
                </div>
                <div className="cardTitle1">
                  {item.title}
                </div>
                <div className="cardText">
                  {item.description}
                </div>
                <div className="cardText1">
                  Rs. {item.price}
                </div>

              </div>
            ))}
          </div>

            </div>
            </div>

            {/* products end */}


    {/* Team Starts */}
        <div className="container-fluid pt-5">
          <div className="container">
            <div className="text-center pb-2">
              <h6 className="text-primary text-uppercase font-weight-bold">
                Delivery Team
              </h6>
              <h1 className="mb-4">Meet Our Delivery Team</h1>
            </div>
            <div className="row">
            <div className="col-lg-3 col-md-6">
                <div className="team card position-relative overflow-hidden border-0 mb-5">
                  <img
                    className="card-img-top"
                    src="assets/anis.jpg"
                    alt=""
                  />
                  <div className="card-body text-center p-0">
                    <div className="team-text d-flex flex-column justify-content-center bg-secondary">
                      <h5 className="font-weight-bold">Anis Sarwar</h5>
                      <span>CEO</span>
                    </div>
                    <div className="team-social d-flex align-items-center justify-content-center bg-primary">
                      <Link to ={'/'}
                        className="btn btn-outline-dark btn-social mr-2"

                      >
                        <i className="fab fa-twitter"></i>
                      </Link>
                      <a
                        className="btn btn-outline-dark btn-social mr-2"
                        href="https://www.facebook.com/anis.sarwar.90" target="blank"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <Link to={"/"}
                        className="btn btn-outline-dark btn-social mr-2"
              
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                      <Link to ={"/"} className="btn btn-outline-dark btn-social">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="team card position-relative overflow-hidden border-0 mb-5">
                  <img
                    className="card-img-top"
                    src="assets/haris.jpg"
                    alt=""
                  />
                  <div className="card-body text-center p-0">
                    <div className="team-text d-flex flex-column justify-content-center bg-secondary">
                      <h5 className="font-weight-bold">Haris Tahir</h5>
                      <span>Sole Distributor</span>
                    </div>
                    <div className="team-social d-flex align-items-center justify-content-center bg-primary">
                      <Link to={'/'}
                        className="btn btn-outline-dark btn-social mr-2"

                      >
                        <i className="fab fa-twitter"></i>
                      </Link>
                      <a
                        className="btn btn-outline-dark btn-social mr-2"
                        href="https://www.facebook.com/haris.tahir.35/" target="blank"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        className="btn btn-outline-dark btn-social mr-2"
                        href="https://pk.linkedin.com/in/haris-tahir-a887a1283?trk=people-guest_people_search-card" target="blank"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <Link to={"/"} className="btn btn-outline-dark btn-social">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="team card position-relative overflow-hidden border-0 mb-5">
                  <img
                    className="card-img-top"
                    src="assets/img/team-1.jpg"
                    alt=""
                  />
                  <div className="card-body text-center p-0">
                    <div className="team-text d-flex flex-column justify-content-center bg-secondary">
                      <h5 className="font-weight-bold">Sarah White</h5>
                      <span>Distributor</span>
                    </div>
                    <div className="team-social d-flex align-items-center justify-content-center bg-primary">
                      <Link to={'/'}
                        className="btn btn-outline-dark btn-social mr-2"
                      >
                        <i className="fab fa-twitter"></i>
                      </Link>
                      <a
                        className="btn btn-outline-dark btn-social mr-2"
                        href="https://www.facebook.com/rohaid.ahmed.mirza" target="blank"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        className="btn btn-outline-dark btn-social mr-2"
                        href="https://pk.linkedin.com/in/rohaid-ahmed-mirza-11a35721a" target="blank"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <Link to ={'/'} className="btn btn-outline-dark btn-social">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* <!-- Team End -->*/}


    {/* Testimonial Start */}
        <div className="container-fluid py-5">
          <div className="container">
            <div className="text-center pb-2">
              <h6 className="text-primary text-uppercase font-weight-bold">
                Testimonial
              </h6>
              <h1 className="mb-4">Our Clients Say</h1>
            </div>
            <div className="ck"style={{ 
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  // Add more styles as needed
}}>
              <div className="position-relative bg-secondary p-4">
                <i
                  className="fa fa-3x fa-quote-right text-primary position-absolute"
                  style={{ top: "-6px", right: "0" }}
                ></i>
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid rounded-circle"
                    src="assets/img/testimonial-1.jpg"
                    style={{ width: "60px", height: "60px" }}
                    alt=""
                  />
                  <div className="ml-3">
                    <h6 className="font-weight-semi-bold m-0">
                      Muhammad Ali Sheikh
                    </h6>
                    <small>CEO, ABC Corporation</small>
                  </div>
                </div>
                <p className="m-0">
                  "The Enterprise Supply Chain Hub has revolutionized the way we
                  manage our global supply chain. The unified platform has
                  enabled us to track demand patterns and manage our sales teams
                  effectively, leading to improved productivity and
                  profitability."
                </p>
              </div>
              <div className="position-relative bg-secondary p-4">
                <i
                  className="fa fa-3x fa-quote-right text-primary position-absolute"
                  style={{ top: "-6px", right: "0" }}
                ></i>
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid rounded-circle"
                    src="assets/img/testimonial-2.jpg"
                    style={{ width: "60px", height: "60px" }}
                    alt=""
                  />
                  <div className="ml-3">
                    <h6 className="font-weight-semi-bold m-0">John Smith</h6>
                    <small>Distributor, XYZ Inc.</small>
                  </div>
                </div>
                <p className="m-0">
                  "The location tracking feature has been a game-changer for our
                  sales team. We can now monitor their tasks and provide them
                  with the necessary support to close deals more efficiently.
                  The user-friendly web application has also made it easier for
                  them to manage their tasks and keep track of their progress."
                </p>
              </div>
              <div className="position-relative bg-secondary p-4">
                <i
                  className="fa fa-3x fa-quote-right text-primary position-absolute"
                  style={{ top: "-6px", right: "0" }}
                ></i>
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid rounded-circle"
                    src="assets/img/testimonial-3.jpg"
                    style={{ width: "60px", height: "60px" }}
                    alt=""
                  />
                  <div className="ml-3">
                    <h6 className="font-weight-semi-bold m-0">Lee Son</h6>
                    <small>Owner, Lee's Furniture</small>
                  </div>
                </div>
                <p className="m-0">
                  "I have been using the Enterprise Supply Chain Hub for the
                  past six months and have been very impressed with the system's
                  accuracy in predicting in-demand products. The feedback
                  feature has also been useful in addressing any issues with the
                  products promptly. I highly recommend this platform to any
                  business looking to improve their supply chain management."
                </p>
              </div>
              <div className="position-relative bg-secondary p-4">
                <i
                  className="fa fa-3x fa-quote-right text-primary position-absolute"
                  style={{ top: "-6px", right: "0" }}
                ></i>
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="img-fluid rounded-circle"
                    src="assets/img/testimonial-5.jpg"
                    style={{ width: "60px", height: "60px" }}
                    alt=""
                  />
                  <div className="ml-3">
                    <h6 className="font-weight-semi-bold m-0">Sarah Lee</h6>
                    <small>COO, Lee's Fashion</small>
                  </div>
                </div>
                <p className="m-0">
                  "As a fashion retailer, it's critical for us to stay on top of
                  the latest trends and have the right products in stock at the
                  right time. The Enterprise Supply Chain Hub has helped us
                  streamline our inventory management and minimize stockouts.
                  The platform's real-time analytics and demand forecasting
                  capabilities have been instrumental in improving our supply
                  chain efficiency. I highly recommend this platform to any
                  fashion retailer looking to stay ahead of the competition."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Testimonial End --> */}

       



   {/*<!-- Blog Start --> */}
        <div className="container-fluid pt-5">
          <div className="container">
            <div className="text-center pb-2">
              <h6 className="text-primary text-uppercase font-weight-bold">
                Our Blog
              </h6>
              <h1 className="mb-4">Latest From Blog</h1>
            </div>
            <div className="row">
              <div className="col-md-6 mb-5">
                <div className="position-relative">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/blog-1.jpg"
                    alt=""
                  />
                  <div
                    className="position-absolute bg-primary d-flex flex-column align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                      bottom: "-30px",
                      right: "30px",
                    }}
                  >
                    <h4 className="font-weight-bold mb-n1">01</h4>
                    <small className="text-white text-uppercase">Jan</small>
                  </div>
                </div>
                <div className="bg-secondary" style={{ padding: "30px" }}>
                  <div className="d-flex mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                        src="assets/img/user.jpg"
                        alt=""
                      />
                      <a className="text-muted ml-2" href="">
                        John Doe
                      </a>
                    </div>
                    <div className="d-flex align-items-center ml-4">
                      <i className="far fa-bookmark text-primary"></i>
                      <a className="text-muted ml-2" href="">
                        Web Design
                      </a>
                    </div>
                  </div>
                  <h4 className="font-weight-bold mb-3">
                    Tips for Efficient Supply Chain Management
                  </h4>
                  <p>
                    If you're running a business that deals with product
                    distribution, you'll know how challenging it is to maintain
                    an efficient supply chain. In this blog post, we'll provide
                    you with some tips on how to optimize your supply chain
                    management system and improve your overall productivity.
                  </p>
                  <a
                    className="border-bottom border-primary text-uppercase text-decoration-none"
                    href=""
                  >
                    Read More <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <div className="position-relative">
                  <img
                    className="img-fluid w-100"
                    src="assets/img/blog-2.jpg"
                    alt=""
                  />
                  <div
                    className="position-absolute bg-primary d-flex flex-column align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                      bottom: "-30px",
                      right: "30px",
                    }}
                  >
                    <h4 className="font-weight-bold mb-n1">01</h4>
                    <small className="text-white text-uppercase">Jan</small>
                  </div>
                </div>
                <div className="bg-secondary" style={{ padding: "30px" }}>
                  <div className="d-flex mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                        src="assets/img/user.jpg"
                        alt=""
                      />
                      <a className="text-muted ml-2" href="">
                        John Doe
                      </a>
                    </div>
                    <div className="d-flex align-items-center ml-4">
                      <i className="far fa-bookmark text-primary"></i>
                      <a className="text-muted ml-2" href="">
                        Web Design
                      </a>
                    </div>
                  </div>
                  <h4 className="font-weight-bold mb-3">
                    Advantages of Using Technology in Supply Chain Management
                  </h4>
                  <p>
                    Technology has revolutionized the way businesses operate,
                    and supply chain management is no exception. In this blog
                    post, we'll discuss the advantages of using technology in
                    your supply chain management system and how it can benefit
                    your business.
                  </p>
                  <a
                    className="border-bottom border-primary text-uppercase text-decoration-none"
                    href=""
                  >
                    Read More <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Blog End -->


    <!-- Footer Start --> */}
        <div className="Footer">
          <Footer/>
        </div>
        {/* <!-- Footer End -->*/}
      </>
    </div>
  );
}
