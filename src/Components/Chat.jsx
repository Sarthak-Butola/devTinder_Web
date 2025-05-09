import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { formatDate } from '../utils/dateFormatter';

const Chat = () => {
  const scrollContainer = useRef(null);
  const user= useSelector((store)=>store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName

  const {targetUserId} = useParams();
  // console.log(targetUserId);
  const [messages, setMessages] = useState([]);
  const [photoUrl, setPhotoUrl] = useState(" ")
  const [newMessage, setNewMessage] = useState("");
  const [time,setTime] = useState("");
  const [date, setDate] = useState("");
  const[chatMember, setChatMember] = useState(" ");
  

  let handleKeyDown = (event) => {
    if(event.key === 'Enter'){
    sendMessage();
    }
  }

  const fetchChatMember = async()=>{
      let chatReceiver = await axios.get(BASE_URL + "/search/" + "chatMember/" + targetUserId, {withCredentials:true});
          // console.log(chatReceiver);

          const {firstName, lastName, photoUrl} = chatReceiver?.data;
          
          setChatMember(firstName + " " + lastName);
          setPhotoUrl(photoUrl);
  }
  


  const fetchMessages = async()=>{
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId ,{withCredentials: true,
    });
    console.log(chat);

    const chatMessages = chat?.data?.messages.map((msg)=>{
      const{senderId, text, createdAt} = msg;
      return{
        // PUSH SENDER ID TOO
        _id:senderId?._id,
        firstName:senderId?.firstName,
        lastName:senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  //FETCH MESSAGES FROM THE DB AS SOON AS CHAT COMPONENT LOADS
  useEffect(()=>{
    fetchMessages();
    fetchChatMember();
  },[])

  useEffect(()=>{
    // axios.get(BASE_URL + "")
  })

  useEffect(()=>{
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
    }
  },[messages])

//CONNECTING TO SERVER as soon as chat page is opened
useEffect(()=>{

  if(!userId) return;
 const socket =  createSocketConnection();
 //as soon as page loads, the socket connection is made and joinChat event is emitted.
 socket.emit("joinChat", {firstName, userId, targetUserId});

 socket.on("messageReceived", ({firstName, text, lastName})=>{
  // console.log(firstName + " " + lastName +": " + text);
  setMessages((messages)=>[...messages, {firstName, text, lastName}]);

  // setTime(new Date().toLocaleTimeString());
  // setDate(new Date().toLocaleDateString());

})

 return()=>{
  //socket is closed/dismounted as soon as page unloads
  socket.disconnect();
 }
  },[userId, targetUserId, messages]);

  const sendMessage = ()=>{
   const socket = createSocketConnection();
   socket.emit("sendMessage", {
    firstName,
    userId,
    targetUserId,
    text:newMessage,
    lastName,
   }) 

   setNewMessage(" ");
  }

  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg '>
      <div className='p-5 border-b border-gray-600 font-bold text-2xl flex px-5'>
      <img src={photoUrl} className=" w-12 h-12 rounded-full object-cover mx-5" alt="User Profile" />
        {chatMember}
      </div>

      <div className='flex overflow-y-auto p-5 flex-col h-lvh'
       ref={scrollContainer} >

      {messages && messages.map((msg,index)=>{
        return(
          //THESE ?ARE REMOVING ERROR  | IN CONSOLE |  
        <div className={"chat " + (user?.firstName + user?.lastName  === msg?.firstName + msg?.lastName ? "chat-end" : "chat-start") } key={index}>
          <div  className="chat-header pt-2">
          {msg.firstName + " " + msg.lastName}
          <time className="text-xs opacity-50 ml-2">{formatDate(msg?.createdAt)}</time>
        </div>
        <div className="chat-bubble ">{msg.text} </div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
     </div>
        )
      })}
         </div>
      <div className='p-5 border-t border-gray-600 flex flex-items-center gap-2'>
        <input type="text" className='flex-1 border border-gray-600 rounded p-2' 
        value={newMessage} 
          onChange={(e)=>{
          setNewMessage(e.target.value);  
        }}
        onKeyDown={handleKeyDown}
       
        />
        <button  onClick={sendMessage} className=' btn btn-primary'>Send</button>

      </div>

    </div>
  )
}

export default Chat
