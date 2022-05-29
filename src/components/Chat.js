import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from "./ChatInput";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';

function Chat() {

    const chatRef = useRef(null);

    // pulling the roomId from the store of redux  
    const roomId = useSelector(selectRoomId);

    // this is for extract the name of the current room
    // we verify if is there any roomId before
    const [roomDetails] = useDocument(
        roomId && doc(db, "rooms", roomId)
    );

    // get all the messages from that room
    const [roomMessages, loading] = useCollection(
        roomId && query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp", "asc"))
    );

    // when the roomId change, I want the Chat component scroll me
    // down be default
    useEffect(() => {

        // get the chatRef, poin to the current room and scroll it down
        chatRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [roomId, loading]);

  return (
    <ChatContainer>

        {roomDetails && roomMessages && (

            <>
                {/** Header component */}
                <Header>
                    <HeaderLeft>

                        <h4>
                            <strong>#{roomDetails?.data().name}</strong>
                        </h4>
                        <StarBorderOutlinedIcon />

                    </HeaderLeft>

                    <HeaderRight>
                        <p>
                            <InfoOutlinedIcon /> Details
                        </p>
                    </HeaderRight>
                </Header>


                {/** Chat component */}
                <ChatMessages>

                    {/** Listing all the messages */}
                    {roomMessages?.docs.map((doc) => {

                        const { message, timestamp, user, userImage } = doc.data();

                        return(

                            <Message
                            
                            key={doc.id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage} />
                        );
                    })}

                    <ChatBottom ref={chatRef} />
                </ChatMessages>

                {/** this is the input for the messages, grabing properties */}
                <ChatInput
                
                chatRef={chatRef}
                channelName={roomDetails?.data().name}
                channelId={roomId}/>

            </>
        )}
    </ChatContainer>
  )
}

export default Chat;

const ChatContainer = styled.div`

    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 70px;
`;

const Header = styled.div`

    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`

    display: flex;
    align-items: center;

    > h4{

        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root{
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`

    > p{

        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root{

        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`

    padding-bottom: 250px;
`;