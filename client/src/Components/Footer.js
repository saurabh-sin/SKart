import React from 'react';
import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { Email } from '@mui/icons-material';
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${mobile({
    display: 'block',
    textAlign: 'center',
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    backgroundColor: '#2979ff',
    color: '#fff',
  })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 100%;
`;

const Footer = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Left>
        <Logo>SKart</Logo>
        <Desc>
          The Best Online Shopping website in India🔥. Find best items at best
          prices. Items at lightning speed with 4 days max delivery.
        </Desc>
        <SocialContainer>
          <SocialIcon color='#385999' >
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color='#E4405F'>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color='#55ACEE'>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color='#E60023'>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem onClick={() => navigate('/')}>Home</ListItem>
          <ListItem onClick={() => navigate('/cart')}>My Cart</ListItem>

          <ListItem onClick={() => navigate('/products/men')}>
            Man Fashion
          </ListItem>

          <ListItem onClick={() => navigate('/products/women')}>
            Woman Fashion
          </ListItem>

          <ListItem>Accessories</ListItem>

          <ListItem>My Account</ListItem>

          <ListItem
            onClick={() =>
              !user
                ? navigate('/login')
                : navigate(`/orders/${user.others._id}`)
            }
          >
            My Orders
          </ListItem>

          <ListItem onClick={() => navigate(`/wishlist/${user.others._id}`)}>
            WishList
          </ListItem>
          <ListItem>Coins</ListItem>

          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <AddLocationAltIcon style={{ marginRight: '10px' }} />
         55A, Medical Collage road Gorakhpur.
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: '10px' }} /> +918543939308
        </ContactItem>
        <ContactItem>
          <Email style={{ marginRight: '10px' }} /> sbhsingh6202@gmail.com
        </ContactItem>
        <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
      </Right>
    </Container>
  );
};

export default Footer;
