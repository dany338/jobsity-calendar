import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px 10px 25px;
  cursor: pointer;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
  justify-content: flex-start;
  align-items: flex-start;

  &:hover {
    transform: scale(1.05);
  }

  h4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: ${(props) => (props.isDayMonthCurrent) ? '#000' : '#c3c3c3' };
  }
`;
