// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { FaPlus } from "react-icons/fa6";
// import { FaImage } from "react-icons/fa6";
// import { FaViadeo } from "react-icons/fa6";
// import { IoMdSend } from "react-icons/io";

// const MessagePage = () => {
//   const params = useParams();
//   const socketConnection = useSelector(
//     (state) => state?.user?.socketConnection
//   );

//   const user = useSelector((state) => state?.user);
//   const [dataUser, setDataUser] = useState({
//     name: "",
//     email: "",
//   });

//   const [openImagVideoUpload, setOpenImagVideoUpload] = useState(false);

//   const [message, setMessage] = useState({
//     text: "",
//     videoUrl: "",
//     imagUrl: "",
//   });

//   try {
//     console.log("params", params.userId);
//   } catch (error) {
//     console.log("error", error);
//   }

//   const hendelUploadImagVideoopen = () => {
//     setOpenImagVideoUpload((preve) => !preve);
//   };
//   useEffect(() => {
//     if (socketConnection) {
//       socketConnection.emit("message-page", params.userId);

//       socketConnection.on("message-user", (data) => {
//         console.log("user details", data);
//         setDataUser(data);
//       });

//       socketConnection.on('message',(data)=>{
//         console.log("message", data);


//       })


//     }
//   }, [socketConnection, params?.userId, user]);

//   const handelUploadImag = async (e) => {
//     const file = e.target.files[0];

//     setMessage((preve) => {
//       return {
//         ...preve,
//         imagUrl: file.url,
//       };
//     });
//   };

//   const handelUploadVideo = (e) => {
//     const file = e.target.files[0];

//     setMessage((preve) => {
//       return {
//         ...preve,
//         videoUrl: file.url,
//       };
//     });
//   };

//   const handelOnChange = (e) => {
//     const { name, value } = e.target;

//     setMessage((preve) => {
//       return {
//         ...preve,
//         text: value,
//       };
//     });
//   };

//   const handelSendMessage = (e) => {
// e.preventDefault()

//     if(message.text){
//       if(socketConnection){
//         socketConnection.emit('new message',{
//           sender : user?._id,
//           receiver : params.userId,
//           text : message.text,
//           msgByUserId : user?._id
//         })
//       }
//     }
//   }

//   return (
//     <div className="bg-green-300">
//       <header className="sticky top-0 h-6 bg-white">
//         <div className="flex item-center gap-4">
//           <h3 className="font-semibold text-lg my-0">{dataUser?.name}</h3>
//         </div>
//       </header>
//       <section className="h-[calc(100ch-128px)] overflow-x-hidden overflow-y-scroll scrollbar p-4">
//         {message.imagUrl && (
//           <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden ">
//             <div className="bg-white p-3">
//               <img
//                 src={message.imagUrl}
//                 width={300}
//                 height={300}
//                 alt="upload image"
//               />
//             </div>
//           </div>
//         )}
//         show messages
//       </section>

//       <section className="h-16 bg-white flex items-center px-4">
//         <div className=" relative ">
//           <button
//             onClick={hendelUploadImagVideoopen}
//             className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-green-600 hover:text-white"
//           >
//             <FaPlus size={25} />
//           </button>

//           {openImagVideoUpload && (
//             <div className="bg-white shadow rounded absolute bottom-16 w-36 p-2">
//               <form>
//                 <label
//                   htmlFor="uploadImag"
//                   className="flex items-center p-2 gap-3 px-3 hover:bg-slate-200 cursor-pointer"
//                 >
//                   <div className="text-green-600">
//                     <FaImage size={18} />
//                   </div>
//                   <p>imag</p>
//                 </label>
//                 <label
//                   htmlFor="uploadvideo"
//                   className="flex items-center p-2 gap-3 px-3 hover:bg-slate-200 cursor-pointer"
//                 >
//                   <div className="text-green-600">
//                     <FaViadeo size={18} />
//                   </div>
//                   <p>video</p>
//                 </label>

//                 <input
//                   type="file"
//                   id="uploadImag"
//                   onChange={handelUploadImag}
//                 />
//                 <input
//                   type="file"
//                   id="uploadvideo"
//                   onChange={handelUploadVideo}
//                 />
//               </form>
//             </div>
//           )}
//         </div>
//         <section>
//           <form className="h-fullw-full flex gap-2" onSubmit={handelSendMessage}>
//             <input
//               type="text"
//               placeholder="enter message..."
//               className="py-1 px4 outlone-none w-full h-full "
//               value={message.text}
//               onChange={handelOnChange}
//             />
//             <button className="text-green-600 hover:text-green-600">
//               <IoMdSend size={28}/>

//             </button>
//           </form>
//         </section>
//       </section>
//     </div>
//   );
// };

// export default MessagePage;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus, FaImage, FaViadeo } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import moment from 'moment'

const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector((state) => state?.user?.socketConnection);
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
  });

  const [allMessage,setAllMessage]= useState([])
  const currentMessage = useRef()


  useEffect(()=>{
    if(currentMessage.current){
      currentMessage.current.scrollIntoView({behavior : 'smooth',block : 'end'})
    }
  },[allMessage])

  const [openImagVideoUpload, setOpenImagVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    videoUrl: "",
    imagUrl: "",
  });

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      socketConnection.on('message', (data) => {
        console.log("message data ", data);
        setAllMessage(data)
      });
    }
  }, [socketConnection, params.userId]);

  const hendelUploadImagVideoopen = () => {
    setOpenImagVideoUpload((prev) => !prev);
  };

  const handleUploadImag = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // This will be replaced by actual upload logic
      setMessage((prev) => ({
        ...prev,
        imagUrl: url,
      }));
    }
  };

  const handleUploadVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // This will be replaced by actual upload logic
      setMessage((prev) => ({
        ...prev,
        videoUrl: url,
      }));
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage((prev) => ({
      ...prev,
      text: value,
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          msgByUserId: user?._id,
        });
        setMessage({ text: "", videoUrl: "", imagUrl: "" }); // Clear the message after sending
      }
    }
  };

  return (
    <div className="bg-green-300">
      <header className="sticky top-0 h-6 bg-white">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-lg my-0">{dataUser?.name}</h3>
        </div>
      </header>
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar p-4">
        {message.imagUrl && (
          <div className="w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div className="bg-white p-3">
              <img
                src={message.imagUrl}
                width={300}
                height={300}
                alt="upload image"
              />
            </div>
          </div>
        )}
        {/* Placeholder for displaying messages */}

        <div className="flex flex-col gap-2 py-2 mx-2"  ref={currentMessage}>
          {
            allMessage.map((msg,index)=>{
              return(
                <div className={`bg-white p-1 py-1  rounded w-fit ${user._id === msg.msgByUserId ? "ml-auto bg-teal-200" : ""}`}>
                  <p className="px-2">{msg.text}</p>
                  <p className="text-xs ml-auto w-fit">{moment(msg.createdAt).format('hh:mm')}</p>
                </div>

              )
            })
          }
        </div>
      </section>

      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative">
          <button
            onClick={hendelUploadImagVideoopen}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-green-600 hover:text-white"
          >
            <FaPlus size={25} />
          </button>

          {openImagVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-16 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImag"
                  className="flex items-center p-2 gap-3 px-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-green-600">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadvideo"
                  className="flex items-center p-2 gap-3 px-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-green-600">
                    <FaViadeo size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input
                  type="file"
                  id="uploadImag"
                  className="hidden"
                  onChange={handleUploadImag}
                />
                <input
                  type="file"
                  id="uploadvideo"
                  className="hidden"
                  onChange={handleUploadVideo}
                />
              </form>
            </div>
          )}
        </div>
        <section className="flex-grow">
          <form className="h-full w-full flex gap-2" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Enter message..."
              className="py-1 px-4 outline-none w-full h-full"
              value={message.text}
              onChange={handleChange}
            />
            <button type="submit" className="text-green-600 hover:text-green-700">
              <IoMdSend size={28} />
            </button>
          </form>
        </section>
      </section>
    </div>
  );
};

export default MessagePage;
