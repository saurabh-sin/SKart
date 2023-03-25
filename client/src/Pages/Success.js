import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

import styled from 'styled-components';

const Button = styled.button`
  width: 40%;
  padding: 10px;
  background-color: orange;
  color: black;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  console.log(location);
  const data = location.state.data;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();

  const Axios = axios.create({
    baseURL: 'https://gskartbygs.herokuapp.com/api/orders',
    headers: {
      Authorisation: currentUser.token,
    },
  });

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await Axios.post(
          'https://gskartbygs.herokuapp.com/api/orders',
          {
            userId: currentUser.others._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.totalPrice,
            address: data.billing_details.address,
          }
        );
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Button
        style={{ padding: 10, marginTop: 20 }}
        onClick={() => navigate('/')}
      >
        Go to Homepage
      </Button>
    </div>
  );
};

export default Success;
