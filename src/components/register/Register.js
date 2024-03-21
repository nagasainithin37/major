import styled from "styled-components";

const RegisterContainer = styled.div`
  .body {
    height: 100vh;
    background-color: black;
  }
  .inside-container-1 {
    width: 100%;
    height: 100%;
    background-color: #cce4ff;
  }
  .inside-container-2 {
    width: 100%;
    height: 100%;
    background-color: #1f1f70;
  }
  .wb {
    font-family: "Kanit", sans-serif;
    font-size: 40px;
  }
  .login {
    height: 75%;
    width: 75%;

    background: white;
    border-bottom-left-radius: 30px;
    border-top-left-radius: 30px;
  }
  .login-image {
    height: 75%;
    width: 75%;
    background: #e6f2ff;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
    img {
      width: 100%;
      height: 100%;
      border-bottom-right-radius: 30px;
      border-top-right-radius: 30px;
    }
  }
`;

export default RegisterContainer;
