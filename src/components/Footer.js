import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=6&skip=78')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching products. Status: ' + response.status);
        }
      })
      .then((pro) => {
        setProducts(pro.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <footer className="bg-black text-center text-white mt-20">
      <div className="container p-4">
        <section className="mb-4 border-bottom p-3">
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-google"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-github"></i>
          </a>
        </section>

        <section>
          <form action="#">
            <div className="row d-flex justify-content-start align-items-start">
              <section className="mb-4 border-bottom pb-3">
                <div className="row">
                  {products &&
                    products.map((pro) => (
                      <div className="col-lg-2 col-md-4 col-sm-6 mb-4 mb-md-0" key={pro.id}>
                        <div
                          className="bg-image hover-overlay ripple shadow-1-strong rounded"
                          data-ripple-color="light"
                        >
                          <img
                            src={pro.thumbnail}
                            className="w-100"
                            style={{ height: '200px', objectFit: 'cover' }}
                            alt="Product Thumbnail"
                          />
                          <a href={`/detail/${pro.id}`}>
                            <div
                              className="mask"
                              style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                            ></div>
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="footer-widget text-left">
                    <h4 className="text-left">About Dummy</h4>
                    <p>
                      At Dummy, we believe that shopping should be an enjoyable and convenient
                      experience, right from the comfort of your own home.
                    </p>
                    <p>
                      With our extensive collection of products and user-friendly interface, we aim
                      to provide you with a seamless online shopping journey.
                    </p>
                    <p>
                      Whether you're looking for fashion, electronics, home decor, or personal care
                      items, we've got you covered.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="footer-link-contact">
                    <h4 className="text-left ml-8">Contact Us</h4>
                    <ul className="text-left">
                      <li>
                        <p>
                          <i className="fas fa-map-marker-alt"></i> Address: District 9
                          <br />
                          HCM City,
                          <br /> VietNam
                        </p>
                      </li>
                      <li>
                        <p>
                          <i className="fas fa-phone-square"></i> Phone:{' '}
                          <a style={{ color: 'grey' }} href="tel:+1-888705770">
                            {' '}
                            +1-888 705 770
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <i className="fas fa-envelope"></i> Email:{' '}
                          <a style={{ color: 'grey' }} href="mailto:contactinfo@gmail.com">
                            contactinfo@gmail.com
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="footer-link">
                    <h4 className="text-left ml-8">Information</h4>
                    <ul className="text-left">
                      <li>
                        <a style={{ color: 'grey' }} href="#">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a style={{ color: 'grey' }} href="#">
                          Customer Service
                        </a>
                      </li>
                      <li>
                        <a style={{ color: 'grey' }} href="#">
                          Our Sitemap
                        </a>
                      </li>
                      <li>
                        <a style={{ color: 'grey' }} href="#">
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li>
                        <a style={{ color: 'grey' }} href="#">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a style={{ color: 'grey' }} href="#">
                          Delivery Information
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        © {new Date().getFullYear()}- Trang
      </div>
    </footer>
  );
}
