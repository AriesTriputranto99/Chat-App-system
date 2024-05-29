import React, { useState } from "react";
import {IoClose} from 'react-icons/io5'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profil_pic: "",
  });

  const [photo,setPhoto] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };


  const handelPhoto = (e) => {

    const file = e.target.files[0]
    setPhoto(file)
  }

  const handelClearProfile = (e) =>{
    e.stopPropagation()

    setPhoto(null)
  }

  const handelSubmit = async (e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = 'http://localhost:8080/api/register'

    try {
      const res =  await axios.post(URL,data)
      console.log('res',data)

      toast.success(res.data.message)

      if(res.data.success){
        setData({
          name: "",
          email: "",
          password: "",
          profil_pic: "",
        })
        navigate('/email')

      }
    } catch (error) {
      toast.error(error?.res?.data?.message)
      console.log('error',data)
    }


    console.log('data',data)
  }


  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <h3>Wellcome to osher chat</h3>

        <form className="grid gap-4 mt-5" onSubmit={handelSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              className="bg-slate-100 px-2 py-1"
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              className="bg-slate-100 px-2 py-1"
              type="text"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              className="bg-slate-100 px-2 py-1"
              type="text"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profil_pic">
            profile pic :
            
            </label>
            
            <input className="bg-slate-100 px-2 py-1" type="file" id="profil_pic" name="profil_pic" onChange={handelPhoto} />
          </div>
          <button style={{background:'green',marginTop:'3px'}}>
            Register
            </button>
        </form>

         <p>already heve account ? <Link to={'/email'} >Login</Link>  </p>

      </div>
    </div>
  );
};

export default RegisterPage;
