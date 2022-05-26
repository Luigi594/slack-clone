import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function ChatInput({ channelName, channelId, chatRef }) {
    
  // const inputRef = useRef(null);
  const [input, setInput] = useState('');

  // function to send messages
  const sendMessage = e => {

    // preventing the refresh page
    e.preventDefault();

    if(!channelId){
        return false;
    }

    // this is how I could do it with firebase v9
    /** so I first go to my documentReference, which is rooms, then I access into the channel I want and for that I
     * need the channelId. Inside of the document (the room channel) I create another collection called messages, to put all the
     * documents there (all the messages) */
    const myDoc = doc(db, "rooms", channelId);

    addDoc(collection(myDoc, "messages"),{
        message: input,
        timestamp: serverTimestamp(),
        user: "Thomas Shelby",
        userImage: "https://i.pinimg.com/originals/9c/70/54/9c70543426c82c05513dadcd210ce67a.jpg"
    });

    // to scroll it when we send a new message as well
    chatRef.current.scrollIntoView({
        behavior: "smooth"
    });

    setInput('');
  }  

  return (
    <ChatInputContainer>
        
        <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
            <Button hidden type='submit' onClick={sendMessage}>
                SEND
            </Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`

    border-radius: 20px;

    > form {

        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input{

        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button{
        display: none !important;
    }
`;