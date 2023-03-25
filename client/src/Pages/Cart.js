import styled from 'styled-components';
import Annoucements from '../Components/Annoucements';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../reducers/cart';
import toast from 'react-hot-toast';

const STRIPE_KEY =
  'pk_test_51MUsMtSGUmCogRuknBR3Ue5FyzDMO4n8OqaKEf2WlSFOUb6GsXB4Yk6pZZ7CuPSi2plhZSNwy47HXaAMynwQciV0004hZlZViI';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({
    padding: '10px',
  })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.type === 'filled' ? 'orange' : '#2979ff'};
  color: ${(props) => (props.type === 'filled' ? 'black' : 'white')};
`;

const TopTexts = styled.div`
  ${mobile({
    display: 'none',
  })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: 'column',
  })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: 'column',
  })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({
    margin: '5px 15px',
  })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({
    marginBottom: '20px',
  })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: orange;
  color: black;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.currentUser.others._id);

  const [stripeToken, setStripeToken] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await axios.post(
          'https://gskartbygs.herokuapp.com/api/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: 500,
          }
        );
        console.log(data);
        navigate('/success', { state: { data: data, cart: cart } });
      } catch (error) {}
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.totalPrice, navigate]);

  // console.log(stripeToken);

  const handleClear = () => {
    dispatch(clearCart());
    navigate('/');
    toast.success('Your cart is Empty!');
  };

  return (
    <Container>
      <Navbar />
      <Annoucements />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate('/')}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag Items({cart.products.length})</TopText>
            <TopText onClick={handleClear}>CLEAR CART</TopText>
          </TopTexts>
          <TopButton
            type='filled'
            onClick={() => navigate(`/orders/${userId}`)}
          >
            MY ORDERS
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => {
              return (
                <div key={product._id}>
                  <Product>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id.slice(0, 6)}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size: {product.size}</b>
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        Quantity:
                        <ProductAmount>{product.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                  <Hr />
                  <Hr />
                </div>
              );
            })}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 8.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -8.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='GS Kart' // the pop-in header title
              description={`The Total is $ ${cart.totalPrice}`} // the pop-in header subtitle
              image='https://avatars.githubusercontent.com/u/55052983?v=4' // the pop-in header image (default none)
              panelLabel='Give Money' // prepended to the amount in the bottom pay button
              amount={cart.totalPrice * 100} // cents
              currency='USD'
              stripeKey={STRIPE_KEY}
              //email='gskartofficial@gmail.com'
              shippingAddress
              billingAddress
              allowRememberMe // "Remember Me" option (default true)
              token={onToken} // submit callback
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
