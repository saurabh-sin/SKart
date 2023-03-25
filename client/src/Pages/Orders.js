import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Annoucements from '../Components/Annoucements';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import './order.css';

import { useSelector } from 'react-redux';
import NewsLetter from '../Components/NewsLetter';
import Footer from '../Components/Footer';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import { Dots } from 'react-preloaders';

const Orders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.currentUser?.token);

  const [productId, setProductId] = useState('');

  const Axios = axios.create({
    baseURL: 'https://gskartbygs.herokuapp.com/api',
    headers: { Authorisation: token },
  });

  const [open, setOpen] = useState(false);
  const [called, setCalled] = useState(false);

  const onOpenModal = (id) => {
    setOpen(true);
    setProductId(id);
  };
  const onCloseModal = () => setOpen(false);

  const [review, setReview] = useState({
    title: '',
    review: '',
    star: 4,
  });

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/orders/find/${id}`,
        {
          headers: { Authorisation: token },
        }
      );

      setOrders(data);
    };

    token && getOrders(id);
  }, []);

  console.log(orders);

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (id) => {
    try {
      await Axios.post(`/products/writereview/${id}`, review);
      navigate(`/product/${id}`);
      toast.success('Thanks for Sharing your review!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRadio = (e) => {
    // console.log(e.target.value);
    setReview({ ...review, star: e.target.value });
  };

  if (orders.length == 0)
    return (
      <>
        <Navbar />
        <Annoucements />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            background: 'orange',
            padding: '16px',

            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          You have No orders! Please order something first!
        </div>
      </>
    );
  return (
    <div>
      <Navbar />
      <Annoucements />

      <div className='container mt-3 mt-md-5'>
        <h2 className='text-charcoal hidden-sm-down'>Your Orders</h2>

        {orders.map((order) => {
          return (
            <div className='row' key={order._id}>
              <div className='col-12'>
                <div className='list-group mb-5'>
                  <div
                    className='list-group-item p-3 bg-snow'
                    style={{ position: 'relative' }}
                  >
                    <div className='row w-100 no-gutters'>
                      <div className='col-6 col-md'>
                        <h6>OrderID</h6>
                        <h6 className='text-charcoal mb-0 w-100'>
                          {order._id.slice(0, 8)}
                        </h6>
                        <p className='text-pebble mb-0 w-100 mb-2 mb-md-0'></p>
                      </div>
                      <div className='col-6 col-md'>
                        <h6 className='text-charcoal mb-0 w-100'>Date</h6>
                        <p className='text-pebble mb-0 w-100 mb-2 mb-md-0'>
                          {order.createdAt.split('T')[0]}
                        </p>
                      </div>
                      <div className='col-6 col-md'>
                        <h6 className='text-charcoal mb-0 w-100'>Total</h6>
                        <p className='text-pebble mb-0 w-100 mb-2 mb-md-0'>
                          ${order.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='list-group-item p-3 bg-white'>
                    <div className='row no-gutters'>
                      <div className='col-12 col-md-9 pr-0 pr-md-3'>
                        <div className='alert p-2 alert-success w-100 mb-0'>
                          <h6 className='text-green mb-0'>
                            <b>{order.status}</b>
                          </h6>
                        </div>
                      </div>

                      {order.products.map((product) => {
                        return (
                          product.productId && (
                            <div
                              className='row no-gutters mt-3'
                              key={product.productId._id}
                            >
                              <div
                                className='col-3 col-md-1 imgdiv'
                                onClick={() =>
                                  navigate(`/product/${product.productId._id}`)
                                }
                              >
                                <img
                                  className='img-fluid pr-3'
                                  style={{ cursor: 'pointer' }}
                                  src={product.productId.img}
                                  alt=''
                                />
                              </div>
                              <div className='col-9 col-md-8 pr-0 pr-md-3'>
                                <h6 className='text-charcoal mb-2 mb-md-1'>
                                  <p
                                    className='text-charcoal'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                      navigate(
                                        `/product/${product.productId._id}`
                                      )
                                    }
                                  >
                                    {product.productId.title}
                                  </p>
                                </h6>
                                <ul className='list-unstyled text-pebble mb-2 small'>
                                  <li className=''>
                                    Street:{'  '}
                                    <b>{order.address.line1}</b>
                                  </li>
                                  <li className=''>
                                    City: {'  '}
                                    <b>{order.address.city}</b>
                                  </li>
                                  <li className=''>
                                    Country: {'  '}
                                    <b>{order.address.country}</b>
                                  </li>
                                </ul>
                                <h6 className='text-charcoal text-left mb-0 mb-md-2'>
                                  Total{'  '}
                                  <b>${product.productId.price}</b>
                                </h6>
                              </div>
                              <button
                                className='btn-review'
                                onClick={() =>
                                  onOpenModal(product.productId._id)
                                }
                              >
                                Write a Review
                              </button>
                              {open && (
                                <Modal
                                  open={open}
                                  onClose={onCloseModal}
                                  center
                                >
                                  <h4 style={{ textAlign: 'center' }}>
                                    GS Kart
                                  </h4>
                                  <div
                                    className='reviewRating'
                                    ng-controller='ReviewController as reviewCTRL'
                                  >
                                    <div className='form-group'>
                                      <label
                                        for='exampleInputName2'
                                        ng-model='reviews.name'
                                      >
                                        Title:
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control'
                                        id='exampleInputName2'
                                        placeholder='Jane Doe'
                                      />
                                    </div>

                                    <div onChange={handleRadio}>
                                      <label style={{ marginRight: '8px' }}>
                                        Rating:
                                      </label>
                                      <select name='' id=''>
                                        <option value='1'>1 Star </option>
                                        <option value='2'>2 Stars </option>
                                        <option value='3'>3 Stars </option>
                                        <option value='4'>4 Stars </option>
                                        <option value='5'>5 Stars </option>
                                      </select>
                                    </div>
                                    <br />
                                    <label for=''>Write a Review!</label>
                                    <textarea
                                      name='review'
                                      id=''
                                      cols='35'
                                      rows='5'
                                      placeholder='Write your review in here, please let the next customers know how your experience was!'
                                      onChange={handleChange}
                                      value={review.review}
                                    ></textarea>
                                    <br />
                                    <br />
                                    <button
                                      className='btn'
                                      style={{
                                        background: '#2979ff',
                                        color: '#fff',
                                      }}
                                      onClick={() => handleSubmit(productId)}
                                    >
                                      Submit Review!
                                    </button>
                                  </div>
                                </Modal>
                              )}
                            </div>
                          )
                        );
                      })}
                    </div>

                    {/* <div className='row no-gutters mt-3'>
                      <div className='col-3 col-md-1'>
                        <img className='img-fluid pr-3' src='' alt='' />
                      </div>

                      <div className='row no-gutters mt-3'>
                        <div className='col-3 col-md-1'>
                          <img className='img-fluid pr-3' src='' alt='' />
                        </div>
                        <div className='col-9 col-md-8 pr-0 pr-md-3'>
                          <h6 className='text-charcoal mb-2 mb-md-1'>
                            <a href='' className='text-charcoal'>
                              1 x URGE Basics iPhone 6/iPhone 6 Plus Magnetic
                              Wallet Case
                            </a>
                          </h6>
                          <ul className='list-unstyled text-pebble mb-2 small'>
                            <li className=''>
                              <b>Color:</b> Red
                            </li>
                            <li className=''>
                              <b>Size:</b> L
                            </li>
                          </ul>
                          <h6 className='text-charcoal text-left mb-0 mb-md-2'>
                            <b>$19.54</b>
                          </h6>
                        </div>
                        <div className='col-12 col-md-3 hidden-sm-down'>
                          <a href='' className='btn btn-secondary w-100 mb-2'>
                            Buy It Again
                          </a>
                          <a href='' className='btn btn-secondary w-100'>
                            Request a Return
                          </a>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Orders;
