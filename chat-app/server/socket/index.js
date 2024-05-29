const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getuserdetailsfromtoken = require("../helpers/getuserdetailsfromtoken");
const UserModel = require("../models/UserModels");
const {ConversationModel,MessageModel} = require("../models/ConversationModel");
const getConversation =require('../helpers/getConversation')
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }, 
});
const onlineUser = new Set();

io.on("connection", async(socket) => {
  console.log("connect user", socket.id);

  const token = socket.handshake.auth.token;
  console.log('token',token)

  const user = await getuserdetailsfromtoken(token);

  console.log('user',user)

  socket.join(user?._id.toString());
  onlineUser.add(user?._id?.toString());
  console.log('onlineUser',onlineUser)

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on('message-page', async (userId)=>{
    console.log('userid',userId)
    const userDetails = await UserModel.findById(userId).select('-password')

    const payload = {
      _id : userDetails?._id,
      name : userDetails?.name,
      email : userDetails?.email

    }


    
    const getConversationMessage = await ConversationModel.findOne({
      "$or":[
     {sender :user?._id ,receiver: userId},
     {sender : userId  ,receiver:user?._id }

   ]
 }).populate('message').sort({ updatedAt : -1})


 socket.emit("new message",getConversationMessage?.message || [])


  })


  socket.on('new message', async(data)=>{

    let checkChat = await ConversationModel.findOne({
      "$or":[
        {sender :data?.sender ,receiver: data?.receiver},
        {sender : data?.receiver  ,receiver:data?.sender }

      ]
    })

    console.log("new message",data)
    console.log("checkChat",checkChat)

    if(!checkChat){
       const creatrChat = await ConversationModel({
        sender :data?.sender,
        receiver:data?.receiver
       })
       checkChat = await creatrChat.save()
    }

    console.log("new message",data)


    const message = new MessageModel({
        text : data.text,
        msgByUserId : data?.msgByUserId,

    })

    const saveMessage = await message.save()

    const updateConversation = await ConversationModel.updateOne({_id : checkChat?._id},{
      "$push" :{message : saveMessage?._id}
    })

    const getConversationMessage = await ConversationModel.findOne({
       "$or":[
      {sender :data?.sender ,receiver: data?.receiver},
      {sender : data?.receiver  ,receiver:data?.sender }

    ]
  }).populate('message').sort({ updatedAt : -1})


    io.to(data?.sender).emit('message',getConversationMessage?.message || [])
    io.to(data?.receiver).emit('message',getConversationMessage?.message || [])


    const ConversationSidebar = await getConversation(data?.sender)
    const ConversationReceiver = await getConversation(data?.receiver)


    io.to(data?.sender).emit('conversation',ConversationSidebar)
    io.to(data?.receiver).emit('conversation',ConversationReceiver)


  })

  socket.on('sidbar', async (currentUserId)=>{
    console.log('current User',currentUserId)
    const Conversation = await getConversation(currentUserId)

    socket.emit('conversation',Conversation)

    const currentUserConv = await ConversationModel.find({
      "$or" : [
         { sender : currentUserId},
         {receiver : currentUserId}

      ]
    }).sort({ updatedAt : -1 }).populate('message').populate('sender').populate('receiver')

    console.log('currentUserConv',currentUserConv)

    const conversation = currentUserConv.map((conv)=>{

      const countUnseenMsg = conv.message.reduce((preve,curr) => preve + (curr.seen ? 0 : 1),0)

      return{
        _id : conv?._id,
        sender : conv?.sender,
        receiver : conv?.receiver,
        unseenMsg : countUnseenMsg,
        lastMsg : conv.message[conv?.message?.length - 1]

      }
    })

    socket.emit('Conversation',conversation)
  })


  socket.on("disconnect", () => {
    onlineUser.delete(user?._id.toString())
    console.log("disconnect user", socket.id);
  });
});

module.exports = {
  app,
  server,
};
