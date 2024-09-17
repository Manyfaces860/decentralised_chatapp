export const contractAddress = '0x82605F384697Ad8a2eCe5CcACf1c2EF411f6C247'
export const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "chatId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "member",
        "type": "address"
      }
    ],
    "name": "createChatRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "chatId",
        "type": "string"
      }
    ],
    "name": "getChatRoom",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "members",
            "type": "address[]"
          },
          {
            "internalType": "string[]",
            "name": "messages",
            "type": "string[]"
          }
        ],
        "internalType": "struct Chat.ChatRoomMembersAndMessage",
        "name": "room",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "searchAddress",
        "type": "address"
      }
    ],
    "name": "getSearchUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "string[]",
            "name": "chatRoomIds",
            "type": "string[]"
          }
        ],
        "internalType": "struct Chat.AppUsersAndRespectiveChatRoomsTheyArePartOf",
        "name": "user",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "string[]",
            "name": "chatRoomIds",
            "type": "string[]"
          }
        ],
        "internalType": "struct Chat.AppUsersAndRespectiveChatRoomsTheyArePartOf",
        "name": "user",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "secret",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "chatId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "messageCid",
        "type": "string"
      }
    ],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]