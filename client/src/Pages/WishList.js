import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Annoucements from '../Components/Annoucements';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';

import './order.css';
import NewsLetter from '../Components/NewsLetter';
import Footer from '../Components/Footer';

const WishList = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.user.currentUser?.token);
  const navigate = useNavigate();

  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    const getWishList = async () => {
      const { data } = await axios.get(
        `https://gskartbygs.herokuapp.com/api/carts/find/${id}`,
        {
          headers: { Authorisation: token },
        }
      );

      data && setWishList(data);
    };

    token && getWishList(id);
  }, []);

  console.log(wishList);

  if (wishList.length == 0)
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
          Your WishList is Empty! Please Add something first!
        </div>
      </>
    );
  return (
    <div>
      <Navbar />
      <Annoucements />

      <div className='container mt-3 mt-md-5'>
        <h2 className='text-charcoal hidden-sm-down'>Your WishList</h2>

        <div className='row' key={wishList._id}>
          <div className='col-12'>
            <div className='list-group mb-5'>
              <div
                className='list-group-item p-3 bg-snow'
                style={{ position: 'relative' }}
              >
                <div className='row w-100 no-gutters'>
                  <div className='col-6 col-md'>
                    <h6>WishListID</h6>
                    <h6 className='text-charcoal mb-0 w-100'>
                      {wishList._id.slice(0, 8)}
                    </h6>
                    <p className='text-pebble mb-0 w-100 mb-2 mb-md-0'></p>
                  </div>
                  <div className='col-6 col-md'>
                    <h6 className='text-charcoal mb-0 w-100'>Date</h6>
                    <p className='text-pebble mb-0 w-100 mb-2 mb-md-0'>
                      {wishList.createdAt.split('T')[0]}
                    </p>
                  </div>
                  <div className='col-6 col-md'>
                    <h6 className='text-charcoal mb-0 w-100'>Total Items</h6>
                    <p className='text-pebble mb-0 w-100 mb-2 mb-md-0'>
                      {wishList.products.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className='list-group-item p-3 bg-white'>
                <div className='row no-gutters'>
                  <div className='col-12 col-md-9 pr-0 pr-md-3'>
                    <div className='alert p-2 alert-success w-100 mb-0'>
                      <h6 className='text-green mb-0'>
                        <b>Pending</b>
                      </h6>
                    </div>
                  </div>

                  {wishList.products.map((product) => {
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
                            <h6
                              className='text-charcoal mb-2 mb-md-1'
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                navigate(`/product/${product.productId._id}`)
                              }
                            >
                              <p href='' className='text-charcoal'>
                                {product.productId.title}
                              </p>
                            </h6>

                            <h6 className='text-charcoal text-left mb-0 mb-md-2'>
                              Total{'  '}
                              <b>${product.productId.price}</b>
                            </h6>
                          </div>
                          <div className='col-12 col-md-3 hidden-sm-down'>
                            <button
                              onClick={() =>
                                navigate(`/product/${product.productId._id}`)
                              }
                              className='btn btn-secondary w-100 mb-2 mybtn'
                            >
                              Buy It
                            </button>
                            {/* <button href='' className='btn btn-secondary w-100'>
                              Request a Return
                            </button> */}
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default WishList;
