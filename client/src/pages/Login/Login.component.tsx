import React, { useEffect, useState } from "react";
import styled from "styled-components";

import logo from "../../assets/Icon/plus.svg";

const Container = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 512px;
  min-height: 256px;
  border: 1px solid #afafaf;
  border-radius: 10px;
`;

const ProjectLogo = styled.img`
  width: 256px;
  height: 256px;
`;

const OAuthButton = styled.button`
  width: 256px;

  background-color: black;
  border: none;
  color: white;
  margin: 8px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
`;

const HomeButton = styled.button`
  width: 256px;

  background-color: #ddd;
  border: none;
  color: black;
  margin: 8px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
`;

function Login() {
  const handleClickOAuth: React.MouseEventHandler<HTMLButtonElement> = () => {
    alert("OAuth");
  };

  const handleClickHome: React.MouseEventHandler<HTMLButtonElement> = () => {
    alert("Home");
  };

  return (
    <Container>
      <LoginContainer>
        <ProjectLogo src={logo} />
        <OAuthButton onClick={handleClickOAuth}>Sign in with GitHub</OAuthButton>
        <HomeButton onClick={handleClickHome}>메인 화면으로 돌아가기</HomeButton>
      </LoginContainer>
    </Container>
  );
}

export default Login;
