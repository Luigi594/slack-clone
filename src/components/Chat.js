import React from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from "./ChatInput";

function Chat() {

  // pulling the roomId from the store of redux  
  const roomId = useSelector(selectRoomId);  

  return (
    <ChatContainer>

        {/** Header component */}
        <Header>
            <HeaderLeft>

                <h4>
                    <strong>#Room-name</strong>
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


        </ChatMessages>

        {/** this is the input for the messages, grabing
         * properties
         */}
        <ChatInput
        
        channelId={roomId}
        />

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

const ChatMessages = styled.div`


`;