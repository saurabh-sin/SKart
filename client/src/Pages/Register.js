import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, userDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { registrationDone } from '../reducers/user';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      300deg,
      rgba(41, 121, 255, 0.75) 50%,
      rgba(41, 121, 255, 0.95) 0%
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  ${mobile({
    minWidth: '85%',
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 47.5%;
  border: none;
  padding: 15px 20px;
  background-color: #2979ff;
  color: white;
  margin: 5px;
  cursor: pointer;
  ${mobile({
    width: '45%',
    fontSize: '15px !important',
  })}
`;

const Register = () => {
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        user
      );
      // console.log(data);
      dispatch(registrationDone(data));
      toast.success('Registration Succesfull!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create An Account</Title>
        <Form>
          <Input placeholder='name' />
          <Input placeholder='last name' />
          <Input
            placeholder='username'
            value={user.username}
            name='username'
            onChange={handleChange}
          />

          <Input
            placeholder='email'
            name='email'
            value={user.email}
            onChange={handleChange}
          />
          <Input
            placeholder='password'
            name='password'
            value={user.password}
            onChange={handleChange}
          />

          <Agreement>
            By Creating an Account, You are agreeing to Our{' '}
            <b> Terms and Conditions</b>
          </Agreement>
          <Button onClick={handleRegister}>Create</Button>
          <Button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: 'orange',
              padding: '8px 12px',
              fontSize: '18px',
              textAlign: 'center',
              color: '#000',
            }}
          >
            Go For Login
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
