import styled from 'styled-components';

export default styled.button`
  color: #000 !important;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  border: ${(props) => (props.primary ? '2px solid violet' : '2px solid #000000')};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    color: #fff !important;
    background-color: ${(props) => (props.primary ? '#4682B4' : '#4682B4')};
    text-decoration: none;
  }
`;
