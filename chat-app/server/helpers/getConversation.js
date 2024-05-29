const {ConversationModel} = require('../models/ConversationModel')

const getConversation = async (currentUserId)=>{
    if(currentUserId){
        
    const currentUserConv = await ConversationModel.find({
        "$or" : [
           { sender : currentUserId},
           {receiver : currentUserId}
  
        ]
      }).sort({ updatedAt : -1 }).populate('message').populate('sender').populate('receiver')
  
  
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
  
      return conversation
    }else{
        return []
    }
    }


    module.exports = getConversation