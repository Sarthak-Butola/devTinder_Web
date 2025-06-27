import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, BASE_URL1 } from '../utils/constants';
import axios from 'axios';
import { formatDate } from '../utils/dateFormatter';
import { addConnections } from '../utils/connectionSlice';

const Chat = () => {
  const mode = useSelector((store)=>store.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainer = useRef(null);
  const user= useSelector((store)=>store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName

  const {targetUserId} = useParams();
  const [messages, setMessages] = useState([]);
  const [photoUrl, setPhotoUrl] = useState(" ")
  const [newMessage, setNewMessage] = useState("");
  const [chatMember, setChatMember] = useState(" ");
  const chatConnection = useSelector((store)=>store.connections);

  let handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      sendMessage();
    }
  }

  const setConnectionInfo = ()=>{
    chatConnection?.map((connection)=>{
      if(connection._id === targetUserId){
          const {firstName, lastName, photoUrl} = connection;
          setChatMember(firstName + " " + lastName);
          setPhotoUrl(photoUrl);
      }
    })
  }

  const fetchChatMember = async()=>{
      let chatReceiver = await axios.get(BASE_URL1 + "/search/" + "chatMember/" + targetUserId, {withCredentials:true});
          const {firstName, lastName, photoUrl} = chatReceiver?.data;
          setChatMember(firstName + " " + lastName);
          setPhotoUrl(photoUrl);
  }

  const fetchMessages = async()=>{
    const chat = await axios.get(BASE_URL1 + "/chat/" + targetUserId ,{withCredentials: true});
    const chatMessages = chat?.data?.messages.map((msg)=>{
      const{senderId, text, createdAt} = msg;
      return{
        _id:senderId?._id,
        firstName:senderId?.firstName,
        lastName:senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(()=>{
    fetchMessages();
    setConnectionInfo();
    if(!chatConnection)
      fetchChatMember();
  },[])

  useEffect(()=>{
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
    }
  },[messages])

  useEffect(()=>{
    if(!userId) return;
    const socket =  createSocketConnection();
     console.log("socket connected");

    socket.emit("joinChat", {firstName, userId, targetUserId});

    socket.on("messageReceived", ({firstName, text, lastName})=>{
       console.log("Message received:", { firstName, text });
      setMessages((messages)=>[...messages, {firstName, text, lastName}]);
    })

    return()=>{
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
    setNewMessage("");
  }

  return (
    <div className={`w-full max-w-4xl mx-auto border rounded-lg m-2 h-[80vh] flex flex-col
      ${mode ? 'bg-slate-950 border-slate-800 text-gray-100' : 'bg-neutral-50 border-gray-300 text-gray-900'}
      transition-colors duration-500
    `}>
      <div className={`p-4 border-b flex justify-between items-center text-xl sm:text-2xl px-4 sm:px-6
        ${mode ? 'border-slate-800' : 'border-gray-300'} transition-colors duration-500
      `}>
        <div className='flex items-center gap-3'>
          <img src={photoUrl} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" alt="User Profile" />
          <span className="truncate max-w-[140px] sm:max-w-none">{chatMember}</span>
        </div>
        <button
          className={`text-sm sm:text-base btn transition-transform duration-300 hover:scale-110
            ${mode 
              ? 'btn-outline border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'btn-outline border-gray-600 text-gray-700 hover:bg-gray-200 hover:text-gray-900'}
          `}
          onClick={()=> navigate("/connections")}
        >
          Go Back 🡺
        </button>
      </div>

      <div 
        className={`flex overflow-y-auto flex-col p-3 sm:p-5 flex-grow
          ${mode ? 'bg-slate-900' : 'bg-neutral-100'}
          transition-colors duration-500
        `}
        ref={scrollContainer}
      >
        {messages && messages.map((msg,index)=>{
          return(
            <div 
              className={"chat " + (user?.firstName + user?.lastName  === msg?.firstName + msg?.lastName ? "chat-end" : "chat-start")}
              key={index}
            >
              <div  
                className={`chat-header pt-2 text-sm sm:text-base ${mode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-500`}
              >
                {msg.firstName + " " + msg.lastName}
                <time className="text-xs opacity-50 ml-2">{formatDate(msg?.createdAt)}</time>
              </div>
              <div 
                className={`chat-bubble px-3 py-2 text-sm sm:text-base
                  ${
                    user?.firstName + user?.lastName  === msg?.firstName + msg?.lastName
                    ? (mode ? 'bg-indigo-700 text-indigo-100' : 'bg-indigo-300 text-indigo-900')
                    : (mode ? 'bg-slate-700 text-gray-200' : 'bg-white text-gray-900')
                  }
                  transition-colors duration-500
                `}
              >
                {msg.text} 
              </div>
            </div>
          )
        })}
      </div>

      <div className={`p-4 border-t flex flex-col sm:flex-row gap-2
        ${mode ? 'border-slate-800' : 'border-gray-300'}
        transition-colors duration-500
      `}>
        <input
          type="text"
          value={newMessage}
          onChange={(e)=> setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full rounded border px-3 py-2 text-sm sm:text-base
            ${mode
              ? 'bg-slate-800 border-slate-700 text-gray-200 placeholder-gray-400 focus:outline-indigo-500 focus:ring-indigo-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-indigo-600 focus:ring-indigo-600'
            }
            transition-colors duration-500
          `}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className={`btn btn-primary text-sm sm:text-base transition-colors duration-500
            ${mode
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }
          `}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
