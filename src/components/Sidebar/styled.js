import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.2;

  .sidebar__header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-right: 1px solid lightgray;
  }

  .sidebar__headerRight {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 10vw;
  }

  .sidebar__headerRight > .MuiSvgIcon-root {
    margin-right: 2vw;
    font-size: 24px !important;
  }

  .sidebar__search {
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    height: 39px;
    padding: 10px;
  }

  .sidebar__searchContainer {
    display: flex;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
  }

  .sidebar__searchContainer > .MuiSvgIcon-root {
    color: gray;
    padding: 10px;
  }

  .sidebar__searchContainer > input {
    border: none;
    outline-width: 0;
    margin-left: 10px;
    width: 90%;
  }

  .sidebar__issues {
    flex: 1;
    background-color: white;
    overflow: scroll;
  }
`;