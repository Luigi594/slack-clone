import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

function SidebarOptions({ Icon, title, addChannelOption, id }) { 

  const dispatch = useDispatch();

  // add the new channel
  const addChannel = () => {

    const channelName = prompt("Please enter the channel name");

    // adding a new channel if we typed something
    if(channelName){
        
        addDoc(collection(db, "rooms"),{
            name: channelName
        })
    }
  }

  // open the current channel
  const selectChannel = () => {

    if(id){

        dispatch(
            enterRoom({
                roomId: id,
            })
        );
    }
  }

  return (

    /** to add a new channel we pass another prop called: 
    addChannelOption, then we verify if we really passed that prop,
    if it's yes, then we'll see a prompt asking us to put the name
    of the channel we want, if it's not then we'll see the channel
    itself, like already created
    */
    <SidebarOptionContainer onClick={ addChannelOption ? addChannel : selectChannel}>

        {/** if I passed an Icon then render it 
         * 
         * in the other line, if I passed an Icon render
         * the h3 otherwise render an span
        */}

        {Icon && <Icon fontSize="small" style={{ padding: 10 }}/>}
        {Icon ? (
            <h3>{title}</h3>
        ) : (
            <SidebarOptionChannel>
                <span>#</span> {title}
            </SidebarOptionChannel>
        )}
    </SidebarOptionContainer>
  )
}

export default SidebarOptions;

const SidebarOptionContainer = styled.div`

    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover{

        opacity: 0.9;
        background-color: #340e36;
    }

    > h3{
        font-weight: 500;
    }

    > h3 > span{
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`

    padding: 10px 0;
    font-weight: 300;
`;