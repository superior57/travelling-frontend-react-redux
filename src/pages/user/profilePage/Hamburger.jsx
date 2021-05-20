import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMenu = styled.nav`
  display: ${({ open }) => (open ? "flex" : "none")};
  // display: flex;
  flex-direction: column;
  justify-content: center;
  background: #078089;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100%;
  text-align: right;
  padding: 2rem;
  position: ${({ open }) => (open ? "fixed" : "absolute")};
  z-index: 1;
  top: 0;
  left: 0;
  
  // left: ${({ open }) => open && "0"};
  //
  // right: ${({ open }) => !open && "200%"};
  
  
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
      width: 100%;
    }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;

const Menu = ({ open, user }) => {
  const handlerClick = () => {
    let body = document.getElementsByTagName("body")[0];
    body.style.overflow = "initial";
  };

  return (
    <StyledMenu open={open}>
      <Link
        className={"profilePage-link"}
        to="/referral"
        onClick={handlerClick}
      >
        Referral program
      </Link>
      <Link
        className={"profilePage-link"}
        to="/reservations"
        onClick={handlerClick}
      >
        Reservations
      </Link>
      {user?.role.role_type === "Host" && (
        <Link
          className={"profilePage-link"}
          to="/balance-history"
          onClick={handlerClick}
        >
          My balance
        </Link>
      )}
      <Link
        className={"profilePage-link"}
        to={`/user/${user?.id}`}
        onClick={handlerClick}
      >
        Reviews
      </Link>
      {user?.role.role_type === "Host" && (
        <Link
          className={"profilePage-link"}
          to="/buildings"
          onClick={handlerClick}
        >
          Add Venue
        </Link>
      )}
    </StyledMenu>
  );
};

const StyledBurger = styled.button`
  position: absolute;
  top: 21%;
  right: 8%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? "white" : "#078089")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  const handlerClick = () => {
    let body = document.getElementsByTagName("body")[0];
    if (!open) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "initial";
    }
    setOpen(!open);
  };

  return (
    <StyledBurger open={open} onClick={handlerClick}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

function Hamburger({ user }) {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();

  return (
    <div ref={node}>
      <Burger open={open} setOpen={setOpen} />
      <Menu user={user && user} open={open} setOpen={setOpen} />
    </div>
  );
}

export default Hamburger;
