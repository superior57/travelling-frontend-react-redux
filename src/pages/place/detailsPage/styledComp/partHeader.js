import styled from 'styled-components';
import { Nav } from 'reactstrap';

export const NavStyled = styled(Nav)`
  align-items: center;
  > :not(:last-child) {
    margin-right: 50px;
  }
`;

export const FindButton = styled.a`
  color: #fff !important;
  padding: 10px;
  background: #04d2ff;
  border-radius: 5px;

  &:hover {
    text-decoration: none;
  }

  > img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
