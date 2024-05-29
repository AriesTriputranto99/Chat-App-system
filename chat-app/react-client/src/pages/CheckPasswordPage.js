

// import React, { useState ,useEffect} from "react";
// import {Link,useNavigate,useLocation} from 'react-router-dom'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import {useDispatch} from 'react-redux'
// import { setToken } from "../redux/userSlice";

// const CheckPasswordPage = () => {
  
//   const [data, setData] = useState({
//     password: ""
//   });


//   const navigate = useNavigate()
//   const location =useLocation()
//   const dispatch = useDispatch()



// useEffect(()=>{
// if(!location?.state?.name){
//   navigate('/email')
// }
// },[])

// const handelChenage = (e) =>{
//   const { name, value} = e.target

//   setData((preve)=>{
//     return{
//       ...preve,
//       [name] : value
//     }
//   })
// }

//   const handelSubmit = async (e)=>{
//     e.preventDefault()
//     e.stopPropagation()

//     const URL = 'http://localhost:8080/api/password'

//     try {
//       const res =  await axios({
//         method : 'post',
//         url : URL, 
//         data : {
//           userId : location?.state?._id,
//           password : data.password
//         },
//         withCredentials :true
//       })
      

//       toast.success(res.data.message)


//       if(res.data.success){
//         dispatch(setToken(res?.data?.token))
//         localStorage.setItem('token',res?.data?.token)

//         setData({
//           password : "",
         
//         })
//         navigate('/')

//       }
//     } catch (error) {
//       toast.error(error?.res?.data?.message)
//     }
//   }

//   return (
//     <div className="mt-5">
//     <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
// <div>

// </div>
//       <form className="grid gap-4 mt-5" onSubmit={handelSubmit}>
       

//         <div className="flex flex-col gap-1">
//           <label htmlFor="password">Password :</label>
//           <input
//             className="bg-slate-100 px-2 py-1"
//             type="password"
//             id="password"
//             name="password"
//             onChange={handelChenage}
//             value={data.password}
//             required
//           />
//         </div>

        

//         <div className="flex flex-col gap-1">
         
          
//         </div>
//         <button style={{background:'green',marginTop:'3px'}}>
//         Login
//           </button>
//       </form>

//        <p> <Link to={'/forgot-password'} >Forgot Password ?</Link>  </p>

//     </div>
//   </div>
//   )
// }

// export default CheckPasswordPage




// // import React from 'react'

// // const CheckPasswordPage = () => {
// //   return (
// //     <div>CheckPasswordPage</div>
// //   )
// // }

// // export default CheckPasswordPage

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken } from "../redux/userSlice";

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email');
    }
  }, [location?.state?.name, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = 'http://localhost:8080/api/password';

    try {
      const res = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true
      });

      toast.success(res.data.message);

      if (res.data.success) {
        dispatch(setToken(res?.data?.token));
        localStorage.setItem('token', res?.data?.token);

        setData({
          password: "",
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <div></div>
        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              className="bg-slate-100 px-2 py-1"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
            />
          </div>
          <button style={{ background: 'green', marginTop: '3px' }}>
            Login
          </button>
        </form>
        <p>
          <Link to={'/forgot-password'}>Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
