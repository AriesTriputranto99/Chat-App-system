// import React, {useEffect} from 'react'
// import {Outlet,useNavigate,useLocation} from 'react-router-dom'
// import axios from 'axios'
// import {useDispatch, useSelector} from 'react-redux'
// import { logout, setOnlineUser, setUser } from '../redux/userSlice'
// import Sidebar from '../components/Sidebar'
// import logo from '../pic/logo.png'
// import  io from 'socket.io-client'

// const Home = () => {

//   const user = useSelector(state=> state.user)
//   const dispath = useDispatch()
//   const navigate = useNavigate()
//   const location = useLocation()

//   console.log(' user', user)

//   const getUserDetails = async ()=>{
//     try {
//       const URL = 'http://localhost:8080/api/user-details'
//       const res = await axios({
//         url : URL,
//         withCredentials : true

//       })

//       dispath(setUser(res.data.data))


//       if(res.data.data.logout){
//         dispath(logout())
//         navigate("/email")

//       }
      
//       console.log('current user details', res)
//     } catch (error) {
//       console.log('error',error)
//     }
//   }


// useEffect(()=>{
//   getUserDetails()
// },[])

// useEffect(()=>{
// const socketConnection = io(process.env.REACT_APP_BACKEND,{
//   auth : {
//     token : localStorage.getItem('token')
//   }
// } )

// socketConnection.on('onlineUser',(data)=>{
//   console.log(data)
//   dispath(setOnlineUser(data))
// })

// return ()=>{
//   socketConnection.disconnect()
// }
// },[])


// const basePath = location.pathname === '/'
//   return (

//     <div style={{background:"gray"}} className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
//       <section  className= {` bg-white ${!basePath && "hidden" } lg:block`}   >
//         <Sidebar/>
//       </section>

//       <section className={`${basePath && "hidden" } `}>
//         <Outlet/>
//       </section>

// <div className={` justify-center items-center flex-col gap-2 hidden ${!basePath ? 'hidden':"lg:flex"} `}>
//   <div  >
//       <img src={logo} width={250} alt='logo' />
//   </div>
//   <p className='text-lg'>chosse frind to chat with</p>
// </div>
      
//       </div>
//   )
// }

// export default Home

// import React, { useEffect, useCallback } from 'react';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, setOnlineUser, setUser,setsocketConnection } from '../redux/userSlice';
// import Sidebar from '../components/Sidebar';
// import logo from '../pic/logo.png';
// import io from 'socket.io-client';

// const Home = () => {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   console.log('user', user);

//   const getUserDetails = useCallback(async () => {
//     try {
//       const URL = 'http://localhost:8080/api/user-details';
//       const res = await axios({
//         url: URL,
//         withCredentials: true
//       });

//       dispatch(setUser(res.data.data));

//       if (res.data.data.logout) {
//         dispatch(logout());
//         navigate('/email');
//       }

//       console.log('current user details', res);
//     } catch (error) {
//       console.log('error', error);
//     }
//   }, [dispatch, navigate]);

//   useEffect(() => {
//     getUserDetails();
//   }, [getUserDetails]);

//   useEffect(() => {
//     const socketConnection = io(process.env.REACT_APP_BACKEND, {
//       auth: {
//         token: localStorage.getItem('token')
//       }
//     });

//     socketConnection.on('onlineUser', (data) => {
//       console.log(data);
//       dispatch(setOnlineUser(data));
//     });

//     dispatch(setsocketConnection(socketConnection))

//     return () => {
//       socketConnection.disconnect();
//     };
//   }, [dispatch]);

//   const basePath = location.pathname === '/';
//   return (
//     <div style={{ background: 'gray' }} className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
//       <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
//         <Sidebar />
//       </section>

//       <section className={`${basePath && 'hidden'}`}>
//         <Outlet />
//       </section>

//       <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? 'hidden' : 'lg:flex'}`}>
//         <div>
//           <img src={logo} width={250} alt='logo' />
//         </div>
//         <p className='text-lg'>Choose friend to chat with</p>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setOnlineUser, setUser, setsocketConnection } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import logo from '../pic/logo.png';
import io from 'socket.io-client';

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('user', user);

  const getUserDetails = useCallback(async () => {
    try {
      const URL = 'http://localhost:8080/api/user-details';
      const res = await axios({
        url: URL,
        withCredentials: true
      });

      dispatch(setUser(res.data.data));

      if (res.data.data.logout) {
        dispatch(logout());
        navigate('/email');
      }

      console.log('current user details', res);
    } catch (error) {
      console.log('error', error);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND || 'http://localhost:8080';
    const socketConnection = io(backendUrl, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socketConnection.on('connect', () => {
      console.log('Socket connected:', socketConnection.connected); // should log true
    });

    socketConnection.on('disconnect', () => {
      console.log('Socket disconnected:', socketConnection.connected); // should log false
    });

    socketConnection.on('onlineUser', (data) => {
      console.log('Online user data:', data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setsocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, [dispatch]);

  const basePath = location.pathname === '/';
  return (
    <div style={{ background: 'gray' }} className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar />
      </section>

      <section className={`${basePath && 'hidden'}`}>
        <Outlet />
      </section>

      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? 'hidden' : 'lg:flex'}`}>
        <div>
          <img src={logo} width={250} alt='logo' />
        </div>
        <p className='text-lg'>Choose friend to chat with</p>
      </div>
    </div>
  );
};

export default Home;
