import { useContract } from '@/contexts/useContract';
import React, { useEffect, useState } from 'react'

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const BlurSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [userAddress , setUserAddress] = useState('')
  const { provider, contract, signer, ListenForTransactionMine } = useContract()

//   useEffect(() => {
//     console.log('useEffect is running');
//     document.addEventListener('keydown', handleEnterKey);

//     // Cleanup function for removing the event listener
//     return () => {
//         console.log('Cleanup function is running');
//         document.removeEventListener('keydown', handleEnterKey);
//     };
// }, []);

  useEffect(() => {
    console.log(inputValue,'my input')

    const HandleSearch = async (inputAddress) => {
      console.log('starting searching')
      if (provider && contract) {
        console.log('not dead')
        try {
          console.log('1')
          const transactionResponse = await contract.getSearchUser(String(inputAddress));
          const user = transactionResponse[0]
          setUserAddress(user)
        } catch (error) {
          console.log(error);
        }
      }
    };

    if(inputValue.length === 42 && inputValue !== signer.address) {
      console.log('trying')
      HandleSearch(inputValue)
      console.log('successfull')
    }
  },[inputValue])

  

  const HandleCreateChat = async () => {
    if (provider && contract) {
      try {
        console.log(userAddress , 'member')
        const chatId = getRandomInt(5,1000)
        console.log(String(chatId) , 'chatId')
        const transactionResponse = await contract.createChatRoom(String(chatId) ,String(userAddress))
        console.log(transactionResponse)
        await ListenForTransactionMine(transactionResponse);
        console.log('done')
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const HandleInputValue = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div id="search-container" className='space-y-2'>
        <section id="search" >
            <img src="https://cdn-icons-png.flaticon.com/128/3686/3686896.png" alt="search" id="searchImg"/>
            <input type="text" name="" id="searcher" placeholder="0x04386..." onChange={(event) => HandleInputValue(event)} />
            <p>ESC</p>
        </section>
        { userAddress && 
        <section id="searched-person" className='flex flex-col align-middle space-y-2 rounded border-slate-500 border p-5 bg-transparent'>
          <div className='m-auto'>
            <img src="https://images.pexels.com/photos/4866043/pexels-photo-4866043.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className='chat-profile-image' />
          </div>
          <div className='flex flex-col justify-center align-middle gap-3'>
            <p className='h-[30px] text-center'>{userAddress}</p>
            <button className='outline-none rounded-lg p-1 px-2 text-black bg-green-200 border-2 border-green-800' onClick={HandleCreateChat}>Create chat</button>
          </div>
        </section> }
    </div>
  )
}

export default BlurSearch