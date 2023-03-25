import React from 'react';
import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.7s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 8px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2979ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.6s ease;

  &:hover {
    /* background-color: #fff; */

    transform: scale(1.2);
  }
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

const Product = ({ item }) => {
  const user = useSelector((state) => state.user.currentUser);

  const Axios = axios.create({
    baseURL: 'https://gskartbygs.herokuapp.com/api',
    headers: { Authorisation: user.token },
  });

  const handleWish = async () => {
    await Axios.post('/carts', {
      product: item,
      user: user.others._id,
    });

    toast.success('Added to your Wishlist!');
  };
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/cart`} style={{ color: 'white' }}>
            <ShoppingCartIcon />
          </Link>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`} style={{ color: 'white' }}>
            <SearchIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteIcon onClick={handleWish} />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
