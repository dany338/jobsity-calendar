import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.8;

  .content__header {
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
  }

  .content__headerInfo {
    flex: 1;
    padding-left: 20px;
  }

  .content__center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content__headerInfo > h3 {
    margin-bottom: 3px;
    font-weight: 500;
  }

  .content__headerInfo > div {
    color: gray;
  }

  .content__headerInfo {

  }

  .content__body {
    flex: 1;
    background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
    background-repeat: repeat;
    background-position: center;
    padding: 30px;
    overflow: scroll;
  }

  .content__message {
    position: relative;
    font-size: 16px;
    padding: 10px;
    width: fit-content;
    border-radius: 10px;
    background-color: #ffffff;
    margin-bottom: 30px;
  }

  .content__reciever {
    margin-left: auto;
    background-color: #dcf8c6;
  }

  .content__timestamp {
    margin-left: 10px;
    font-size: xx-small;
  }

  .content__name {
    position: absolute;
    top: -15px;
    font-weight: 800;
    font-size: xx-small;
  }

  .content__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    border-top: 1px solid lightgray;
  }

  .content__footer > form {
    flex: 1;
    display: flex;
  }

  .content__footer > form > input {
    flex: 1;
    border-radius: 30px;
    padding: 10px;
    border: none;
    outline-width: 0;
  }

  .content__footer > form > button {
    display: none;
  }

  .content__footer > .MuiSvgIcon-root {
    padding: 10px;
    color: gray;
  }
`;
