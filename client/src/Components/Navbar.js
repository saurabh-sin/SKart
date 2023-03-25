import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../reducers/user';
import toast from 'react-hot-toast';
import Toaster from './Toaster';
import Avatar from 'react-avatar';
import axios from 'axios';

const Container = styled.div`
  height: 60px;
  background-color: #2979ff;
  color: #fff;
  width: 100%;
  ${mobile({ height: '50px' })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: 'none' })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({
    display: 'none',
  })}
`;

const Input = styled.input`
  border: none;
  margin-right: 7px;
  border-radius: 4px;
  min-height: 25px;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: '2', marginRight: '30px' })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: 'center', flex: 3 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-size: 18px;
  ${mobile({
    fontSize: '12px',
    marginLeft: '10px',
  })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);
  // console.log(quantity);

  const [search, setSearch] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    dispatch(logout());
    toast.success('logout Sucessfull!');
    navigate('/login');
  };

  const handleSerach = async () => {
    const { data } = await axios.get(
      `https://gskartbygs.herokuapp.com/api/products/search/${search}`
    );
    console.log(data);
    navigate(`/searchresults/${search}`, { state: { data } });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              value={search}
              onKeyDown={(e) => e.keyCode === 13 && handleSerach()}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <SearchIcon onClick={handleSerach} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
            <Logo>S Kart</Logo>
          </Link>
        </Center>
        {!user ? (
          <Right>
            <MenuItem>Register</MenuItem>
            <MenuItem>Sign In</MenuItem>
            <Link to='/cart' style={{ color: 'white' }}>
              <MenuItem>
                <Badge badgeContent={quantity} color='warning'>
                  <ShoppingCartIcon />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        ) : (
          <Right>
            <MenuItem onClick={handlelogout}>logout</MenuItem>
            <MenuItem>
              {!user.others.img ? (
                <Avatar
                  name={user.others.username}
                  round
                  size='40'
                  onClick={() => navigate(`/profile/${user.others._id}`)}
                />
              ) : (
                <Avatar
                  src={`${user.others.img}`}
                  round
                  size='40'
                  onClick={() => navigate(`/profile/${user.others._id}`)}
                />
              )}
            </MenuItem>
            <Link
              to={`/wishlist/${user.others._id}`}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <MenuItem>Wishlist</MenuItem>
            </Link>
            <Link
              to={`/orders/${user.others._id}`}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <MenuItem>Orders</MenuItem>
            </Link>

            <Link to='/cart' style={{ color: 'white', marginRight: '6px' }}>
              <MenuItem>
                <Badge badgeContent={quantity} color='warning'>
                  <ShoppingCartIcon />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
