// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Chat {

    // data structures

    struct AppUsersAndRespectiveChatRoomsTheyArePartOf {
        address user;
        string[] chatRoomIds;
    }

    struct ChatRoomMembersAndMessage {
        address[] members;
        string[] messages;
    }

    // state Variables

        // private
    string private canYouCallIt = "raj";
    mapping(string => ChatRoomMembersAndMessage) private userToMessages;

        // public 
    AppUsersAndRespectiveChatRoomsTheyArePartOf[] private users;

    // utility functions

    function compareStrings(string memory secret) internal view returns (bool) {
        bytes32 hash1 = keccak256(abi.encodePacked(canYouCallIt));
        bytes32 hash2 = keccak256(abi.encodePacked(secret));
        return hash1 == hash2;
    }

    // main functions

    function registerUser(address user , string memory secret) public {
        require(compareStrings(secret));
        AppUsersAndRespectiveChatRoomsTheyArePartOf memory newUser;
        newUser.user = user;
        users.push(newUser);
    }


    function setMessage(string memory chatId, string memory messageCid) public {
        userToMessages[chatId].messages.push(messageCid);
    }

    function createChatRoom(string memory chatId , address member) public {
        // setting chatId for both the members of the chat room
        for (uint256 i = 0; i < users.length ; i++) 
        {
            if (users[i].user == msg.sender || users[i].user == member) {
                users[i].chatRoomIds.push(chatId);
            }
        }
        // setting the members of room
        ChatRoomMembersAndMessage memory newRoom;
        newRoom.members = new address[](2);
        newRoom.members[0] = msg.sender;
        newRoom.members[1] = member;

        userToMessages[chatId].members = newRoom.members;
    }

    // getter functions

    function getCanYouCallIt() internal view returns (string memory) {
        return canYouCallIt;
    } 

    function getUser() public view returns (AppUsersAndRespectiveChatRoomsTheyArePartOf memory user) {
        for (uint256 i = 0 ; i < users.length ; i++) 
        {
            if (users[i].user == msg.sender) {
                user = users[i];
                break;
            }
        }
        return user;
    }
    function getSearchUser(address searchAddress) public view returns (AppUsersAndRespectiveChatRoomsTheyArePartOf memory user) {
        for (uint256 i = 0 ; i < users.length ; i++) 
        {
            if (users[i].user == searchAddress) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function getChatRoom(string memory chatId) public view returns (ChatRoomMembersAndMessage memory room) {
        return userToMessages[chatId];
    }

}