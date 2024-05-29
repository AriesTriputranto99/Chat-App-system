import React, { useState,useEffect } from "react";
import Divider from "./Divider";
import axios from "axios";
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUser = ({ OnClose, user }) => {
  const [data, setData] = useState({
    name: user?.user,
  });

  const dispath = useDispatch()

  useEffect(()=>{
    setData((preve)=>{
return{
    ...preve,
    ...user
}
    })
  },[user])

  console.log(user)

  const handelSubmit = async(e)=>{
e.preventDefault()
e.stopPropagation()
try {
    const url = 'http://localhost:8080/api/update-user'

    const res = await axios({
        method : 'post',
        data : data,
        url : url,
        withCredentials : true
    })

    toast.success( res.data.message)

    if(res.data.success){
        dispath(setUser(res.data.data))
        OnClose()

    }

} catch (error) {
    toast.error(error?.res?.data?.message)
}
  }

  const handelChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bgopacity-40 flex justify-center items-center">
      <div className="bg-wite p-4 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit UserDetails</p>

        <form className="grid gap-3 mt-3 " onSubmit={handelSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name"> Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handelChange}
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
            ></input>
          </div>
          <div>

          </div>
          <Divider/>
          <div className="flex gap-2w-fit ml-auto mt-3">
            <button onClick={OnClose} className="px-4 py1">cancel</button>
            <button onClick={handelSubmit} className="px-4 py1">save</button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUser);
