import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <Header />

      <AppBody>

        <Sidebar />
        <Routes>
          {/* <Route path="/" element={<Chat />} /> */}
        </Routes>
      </AppBody>
    </div>
  );
}

export default App;

const AppBody = styled.div`

  display: flex;
  height: 100vh;
`;