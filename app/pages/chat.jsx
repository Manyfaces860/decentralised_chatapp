import { useState, useEffect } from 'react';
import ActiveChat from '@/components/ActiveChat.jsx';
import BlurSearch from '@/components/BlurSearch.jsx';
import { useContract } from '@/contexts/useContract';

const Chat = () => {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [chats , setChats] = useState([])
  const [activeChat , setActiveChat] = useState('')
  const [activeMember , setActiveMember] = useState('')

  const { provider, contract, signer, ListenForTransactionMine } = useContract()

  const handleActiveChat = (chatid , member) => {
    setActiveChat(chatid)
    setActiveMember(member)
  }

  const hideSearch = () => {
    const outerStyle = document.getElementById('outer-container')
    outerStyle.classList.remove('outer-container-need') 
    setSearchVisibility(false)
  };
  
  const handleEscapeKey = (event) => {
      if (event.key == 'Escape') {
          hideSearch();
      }
  };
  

  useEffect(() => {
      console.log('useEffect is running');
      document.addEventListener('keydown', handleEscapeKey);

      // Cleanup function for removing the event listener
      return () => {
          console.log('Cleanup function is running');
          document.removeEventListener('keydown', handleEscapeKey);
      };
  }, []);

  // useEffect(() => {
  //   if (chats) {
  //     gsap.from('.chat', {x : -2000 , stagger : 0.2})
  //     gsap.from('#search-container' , {y : -200} )
  //     gsap.from('#chats-area' , {x : 1000 })
  //   }
  // },[chats])

  useEffect(() => {
    const getAllChats = async () => {
      if (contract != null && chats.length == 0) {
        const user = await contract.getUser()
        // console.log(user[0] , user[1][0])
        user[1].map(async (chatid) => {
          const chats = await contract.getChatRoom(String(chatid))
          setChats((chat) => [...chat , {members : chats[0] , chatid : chatid , messages : chats[1]}])
        })
      }
    }
    
    getAllChats()
  },[contract])


  const showSearch = () => {
    const outerStyle = document.getElementById('outer-container')
    outerStyle.classList.add('outer-container-need') 
    setSearchVisibility(true)
  };
  
  const Send = async () => {
    if (provider && contract) {
      try {
        console.log('1')
        const transactionResponse = await contract.sendMessage(signer.address, inputValue);
        console.log('2')
        console.log(transactionResponse);
        console.log('3')
        await ListenForTransactionMine(transactionResponse);
        console.log('Done!');
      } catch (error) {
        console.log(error);
      }

      setInputValue('');
    }
  };

  const Show = async () => {
    if (provider && contract) {
      try {
        const transactionResponse = await contract.getMessage(signer.address);
        transactionResponse.map((text) => {
          console.log(text);
        });
        console.log('Done!');
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <>
    <div id='outer-container'>
      {searchVisibility ? <BlurSearch /> 
        : 
      <div id="container">
          <div id="search-container">
              <section id="search" onClick={showSearch}>
                  <img src="https://cdn-icons-png.flaticon.com/128/3686/3686896.png" alt="search" id="searchImg"/>
                  <input type="text" name="" id="searcher" disabled placeholder="0x04386..." />
              </section>
          </div>

          <hr id="hor-line"/>
        
          <main id="chats-area">
              <div id="chat-available">
                  <h2>My chats</h2>
                  {chats.map((chat) => 
                    <div className="chat cursor-pointer" key={chat.chatid} onClick={() => handleActiveChat(chat.chatid,`${chat.members[0] == signer.address ? chat.members[1].slice(0,10) : chat.members[0].slice(0,10)}`)}>
                        <img className="chat-profile-image" src="https://images.pexels.com/photos/7585607/pexels-photo-7585607.jpeg?auto=compress&cs=tinysrgb&w=600" alt="chat-profile-image"/>
                        <h3 className="chat-name" >{chat.members[0] == signer.address ? chat.members[1].slice(0,10) : chat.members[0].slice(0,10)}</h3>
                    </div>
                  )}
              </div>

              <div id="ver-line"></div>

              <div id="active-chat">{activeChat && activeMember && <ActiveChat chatid={activeChat} member={activeMember} />}</div>
          </main>
      </div>}
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
    </>
  );
};

export default Chat;
