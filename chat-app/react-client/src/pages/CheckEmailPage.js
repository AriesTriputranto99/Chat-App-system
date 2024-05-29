import React, { useState } from "react";
// import {IoClose} from 'react-icons/io5'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const CheckEmailPage = () => {
  
  const [data, setData] = useState({
    email: ""
  });

  // const [photo,setPhoto] = useState("")

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

  const handelSubmit = async (e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = 'http://localhost:8080/api/email'

    try {
      const res =  await axios.post(URL,data)

      toast.success(res.data.message)

      if(res.data.success){
        setData({
          email: "",
         
        })
        navigate('/password',{
          state : res?.data?.data
        })

      }
    } catch (error) {
      toast.error(error?.res?.data?.message)
      console.log('error',data)
    }
  }

  return (
    <div className="mt-5">
    <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
<div>

</div>
      <form className="grid gap-4 mt-5" onSubmit={handelSubmit}>
       

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
         
          
        </div>
        <button style={{background:'green',marginTop:'3px'}}>
          Lets Go
          </button>
      </form>

       <p>New User ? <Link to={'/register'} >Register</Link>  </p>

    </div>
  </div>
  )
}

export default CheckEmailPage