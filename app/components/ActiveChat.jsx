import { useContract } from '@/contexts/useContract';
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';

const ActiveChat = ({ chatid, member }) => {
  const inputMessageRef = useRef('')
  const [socket, setSocket] = useState(null); 
  const [currentMessages , setCurrentMessages] = useState([])
  
  const { provider, contract, signer, ListenForTransactionMine} = useContract()
  
  useEffect(() => {

    const pinFileToIPFS = async (data) => {
      try {
        console.log('entering or not')
        const res = await fetch('http://localhost:3000/api/sendtoipfs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type based on your API requirements
          },
          body: JSON.stringify(data),
        });
  
        if (res.ok) {
          const data = await res.json();
          console.log(data);
        } else {
          console.error('Failed to pin file to IPFS');
        }
      } catch (error) {
        console.error(error);
      }
    };
    // console.log(Boolean(currentMessages == []))
    // if (currentMessages == [[]]) {
    //   console.log('no')
    // } else {
    //   pinFileToIPFS({message : currentMessages})
    // }

    const socket = io('http://localhost:9000');
    setSocket(socket)
    socket.emit('joinRoom' , {chatid : chatid , member : member})
    
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    })

    socket.on('user-message', (message) => {
      console.log(message , 'this is the emitted message')
      let previousMessages = JSON.parse(window.localStorage.getItem(chatid))
      console.log(previousMessages)
      if (previousMessages) {
        const toSet = [...previousMessages , [message.sender ,  message.chatid , message.message]]
        window.localStorage.setItem(chatid, JSON.stringify(toSet))
      } else {
        const toSet = [message.sender ,  message.chatid , message.message]
        window.localStorage.setItem(chatid, JSON.stringify([toSet]))
      }
      setCurrentMessages(JSON.parse(window.localStorage.getItem(chatid)))
    })


    return () => {
      socket.disconnect()
      console.log('socket disconnected')
      window.localStorage.setItem(chatid, null) 
      // console.log(currentMessages , '1') // output = [[]]
      setCurrentMessages([[]])  //always uses the current render state(useState)
      // console.log(currentMessages , '2') // output = [[]]

    }
  },[chatid])


  const handleSubmitMessageInput = (event) => {
    event.preventDefault()
    socket.emit("message", {sender : signer.address ,message :  inputMessageRef.current.value , chatid : chatid});
    inputMessageRef.current.value = ''
  }

  return (
    <div className='container flex flex-col align-middle justify-center h-full'>
      <button id="disconnect" className='flex-[0.08] text-white'>{member} {chatid}</button>
      <div id="messages" className='flex-1 w-full bg-slate-400'>
        {currentMessages.map((message) => <div className={`${message[0] == signer.address ? "text-right" : "text-left"} p-1 text-pink-800 rounded-md`}>{message[2]}</div>)}
      </div>
      <form className="input flex justify-evenly flex-[0.08]" onSubmit={(event) => handleSubmitMessageInput(event)}>
          <input type="text" ref={inputMessageRef} id="messagesss" placeholder="Enter Message" className='w-full flex-1 bg-transparent outline-none p-1' />
          <button id="sendBtn" type='submit' className='flex-[0.3] bg-black rounded'>Send</button>
      </form>
    </div>
  )
}

export default ActiveChat