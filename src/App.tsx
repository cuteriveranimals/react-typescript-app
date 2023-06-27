import React from "react";
import styled from "styled-components";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppBody from "./AppBody";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  color: #fff;
  font-size: 1em;
  height: 100%;
`;

function App() {
  return (
    <AppContainer>
      <AppHeader />
      <AppBody />
      <AppFooter />
    </AppContainer>
  );
}

export default App;
