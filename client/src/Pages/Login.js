import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../Api';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      300deg,
      rgba(41, 121, 255, 0.75) 50%,
      rgba(41, 121, 255, 0.95) 0%
    ),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({
    minWidth: '75%',
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #2979ff;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, details);
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder='username'
            onChange={handleChange}
            name='username'
            value={details.username}
            type='text'
          />
          <Input
            placeholder='password'
            onChange={handleChange}
            name='password'
            value={details.password}
            type='password'
          />
          <Button onClick={handleSubmit} disabled={isFetching}>
            Login
          </Button>
          {error && <Error>Something Went Wrong...</Error>}
          <Link>Forgot the Password?</Link>

          <Link
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: 'orange',
              padding: '8px 12px',
              fontSize: '18px',
              textAlign: 'center',
            }}
          >
            Create a New Account
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
