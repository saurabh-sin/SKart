import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Annoucements from '../Components/Annoucements';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import NewsLetter from '../Components/NewsLetter';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';

import './profile.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState({
    email: '',
    password: '',
    img: null,
  });

  const navigate = useNavigate();
  const Axios = axios.create({
    baseURL: 'https://gskartbygs.herokuapp.com',
    headers: { Authorisation: user?.token },
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.name == 'img' ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!data.email || !data.password) {
        toast.error('Please fill email and password!');
        return;
      }
      if (data.img) {
        const fileName = new Date().getTime() + data.img.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, data.img);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const profile = {
                ...data,
                email: data.email,
                password: data.password,
                img: downloadURL,
              };
              uploadData(profile);
            });
          }
        );
      } else {
        uploadData({
          email: data.email,
          password: data.password,
        });
      }
    } catch (error) {}
  };

  const uploadData = async (profile) => {
    try {
      console.log(data);
      await Axios.patch(`/api/users/${user.others._id}`, profile);
      toast.success('Profile Updated! 🚀');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <Annoucements />
      <div className='wrapper'>
        <div
          className='profile'
          style={{
            minHeight: '100%',
            height: 'auto',
            width: '90%',
            margin: '20px auto',
            color: '#fff',
            marginBottom: '100px',
            backgroundColor: '#2979ff',
            borderTop: '5px solid orange',
            borderRadius: '0 0 5px 5px',
            boxShadow: '0 2.5px 5px #ccc',
          }}
        >
          <div className='content'>
            <h1>Edit Profile</h1>
            <form>
              <fieldset>
                <div className='grid-35'>
                  <label>Your Photo</label>
                </div>
                <div className='grid-65'>
                  <input
                    type='file'
                    name='img'
                    className='btn'
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className='grid-35'>
                  <label for='fname'>Username</label>
                </div>
                <div className='grid-65'>
                  <input
                    type='text'
                    tabIndex='1'
                    name='username'
                    value={user.others.username}
                    style={{ width: '80%' }}
                  />
                </div>
              </fieldset>

              <fieldset>
                <div className='grid-35'>
                  <label for='email'>Email Address</label>
                </div>
                <div className='grid-65'>
                  <input
                    type='email'
                    tabIndex='6'
                    name='email'
                    required
                    onChange={handleChange}
                    style={{ width: '80%' }}
                  />
                </div>
              </fieldset>

              <fieldset>
                <div className='grid-35'>
                  <label for='email'>Password</label>
                </div>
                <div className='grid-65'>
                  <input
                    type='password'
                    tabIndex='6'
                    required
                    name='password'
                    style={{ width: '80%' }}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              <fieldset>
                <input
                  type='button'
                  className='Btn cancel'
                  value='Cancel'
                  onClick={() => navigate('/')}
                />
                <input
                  type='submit'
                  className='Btn'
                  value='Save Changes'
                  onClick={handleSubmit}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Profile;
