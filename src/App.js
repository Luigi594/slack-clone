import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from 'styled-components';
import Chat from './components/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from './components/Login';
import Spinner from "react-spinkit";

function App() {

  const [user, loading] = useAuthState(auth);

  if(loading){

    return(
      <AppLoading>
        <AppLoadingContainer>

            <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/191px-Slack_icon_2019.svg.png" />

            <Spinner  
            
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"/>

        </AppLoadingContainer>
      </AppLoading>
    )
  }

  return (
    <div className="App">

      {!user ? (
        <Login />
      ): (

        <>
          <Header />
            <AppBody>

              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />} />
              </Routes>

            </AppBody>
        </>
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`

  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`

  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;


const AppLoadingContainer = styled.div`

  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  place-items: center;

  > img{

    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;