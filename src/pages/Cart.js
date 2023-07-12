
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../reducer/handleCart';


export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const calculateItemPrice = (item) => {
    return item.quantity * item.price;
  };

  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice;
  };

  return (
    <Container>

      <h2 className='list__title' style={{ margin: '20px' }}>Shopping Cart</h2>
      {!cartItems || cartItems.length === 0 ? (
        <div className="centered__container">
          <div className="empty__message">
            <p>You have not added any product to cart yet.</p>
            <br />
            <Button onClick={() => navigate('/')} className="add__movies__button">Explore more products</Button>
          </div>
        </div>
      ) : (
        <section className="h-100 h-custom">
          <h5 class="mb-3"><a href="/" class="text-body"><i
            class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>

          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="h5">
                          Shopping Bag
                        </th>
                        <th scope="col">Brand</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">
                            <a href={`/detail/${item.id}`} style={{ color: 'black' }}>
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.thumbnail}
                                  className="img-fluid rounded-3"
                                  style={{ width: '150px', height: '170px', objectFit: 'cover' }}
                                  alt={item.title}
                                />
                                <div className="flex-column ms-4">
                                  <p className="mb-2">{item.title}</p>
                                </div>
                              </div>
                            </a>
                          </th>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: 500 }}>
                              {item.brand}
                            </p>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex flex-row">
                              <button className="btn btn-link px-2" onClick={() => handleDecreaseQuantity(item.id)}>
                                <i className="fas fa-minus"></i>
                              </button>
                              <input
                                id="form1"
                                min="1"
                                name="quantity"
                                value={item.quantity}
                                disabled
                                className="form-control form-control-sm"
                                style={{ width: '40px', backgroundColor: 'white' }}
                              />
                              <button className="btn btn-link px-2" onClick={() => handleIncreaseQuantity(item.id)}>
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: 500 }}>
                              ${calculateItemPrice(item)}
                            </p>
                          </td>
                          <td className="align-middle">
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                              <button onClick={() => handleRemove(item.id)} class="text-muted"><i class="fas fa-times"></i></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px' }}>
                  <div className="card-body p-4">
                    <div className="row">


                      <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2"> ${calculateTotalPrice(cartItems)}</p>
                      </div>

                      <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                        <p className="mb-0">Shipping</p>
                        <p className="mb-0">Free shipping</p>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                        <p className="mb-2">Total (tax included)</p>
                        <p className="mb-2"> ${calculateTotalPrice(cartItems)}</p>
                      </div>

                      <button type="button" className="btn btn-block btn-lg" style={{backgroundColor: '#17594A', color: 'white'}}>
                        <div className="d-flex justify-content-between" >
                          <span>Checkout</span>
                          <span>${calculateTotalPrice(cartItems)}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      )}

    </Container>
  );
};


