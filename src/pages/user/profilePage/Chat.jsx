import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getUsersList,
  getCurrentChat,
  sendCurrentMessage,
  getChattingUsers
} from "../../../redux/actions/users.actions/admin.thunk";
import moment from "moment";
import { sendCurrentMessageSuccess } from "../../../redux/actions/users.actions/admin.actions";
import Header from "../../../components/Header";
import fullLogo from "../../../assets/Full_Logo.png";
import { isAuthenticated } from "../../../redux/selectors/auth/auth.select";
import Footer from "../../../components/Footer";

function Chat({
  getUsersList,
  userList,
  getCurrentChat,
  currentMessages,
  sendCurrentMessage,
  getChattingUsers,
  chattingUsers,
  message,
  sendCurrentMessageSuccess,
  isAuthenticated
}) {
  const [UList, setUList] = useState();
  const [messages, setMessages] = useState();
  const [currentMessage, setCurrentMessage] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUsersList();
    getChattingUsers();
  }, []);

  useEffect(() => {
    if (message) {
      getChattingUsers();
    }
    // sendCurrentMessageSuccess(null)
  }, [message]);

  useEffect(() => {
    if (currentMessages) {
      setMessages(currentMessages);
    }
  }, [currentMessages]);

  const handlerSelectUser = event => {
    let currentUser = event.target.value.trim();
    setUserData(currentUser);

    let currentUsersList = [];
    if (currentUser) {
      userList.users.map(val => {
        if (
          val?.first_name?.toUpperCase().indexOf(currentUser.toUpperCase()) !==
            -1 ||
          val?.last_name?.toUpperCase().indexOf(currentUser.toUpperCase()) !==
            -1
        ) {
          currentUsersList.push(val);
        }
      });
    }
    setUList(currentUsersList);
  };

  const handlerChooseUser = event => {
    const userId = event.target.getAttribute("data-id");
    const userName = event.target.getAttribute("data-name");
    const userSurname = event.target.getAttribute("data-surname");

    setCurrentUser({ userId, userName, userSurname });

    setUList("");
    setUserData(userName + " " + userSurname);
    getCurrentChat(userId);
  };

  const handlerSendChange = ({ target }) => {
    setCurrentMessage(target.value);
  };
  const handlerSend = event => {
    if (!currentUser) {
      return false;
    }
    setMessages([
      ...messages,
      {
        authorId: currentUser.userId,
        message: currentMessage,
        author: {
          first_name: currentUser.userName,
          last_name: currentUser.userSurname
        },
        createdAt: moment().format("YYYY-MM-DD hh:mm")
      }
    ]);
    sendCurrentMessage(currentUser.userId, currentMessage);
    getChattingUsers();
    setCurrentMessage("");
  };

  return (
    <div className="wrapper">
      <Header
        fullLogo={fullLogo}
        classes={"home_header"}
        isAuthenticated={isAuthenticated}
        find={true}
      />
      <div className={"wrapper-reservation-content profile"}>
        <div className={"reservation-content sidebar "}>
          <div className={"search_users"}>
            <h3>Last users</h3>
            <div className={"chatting_users"}>
              {chattingUsers?.rows.map(val => (
                <span
                  data-id={val.id}
                  data-name={val.first_name}
                  data-surname={val.last_name}
                  onClick={handlerChooseUser}
                >
                  {val.first_name + " " + val.last_name}
                </span>
              ))}
            </div>

            <input
              type="text"
              onChange={handlerSelectUser}
              value={userData}
              placeholder={"search user for chatting"}
            />
            {UList?.length ? (
              <div className={"dropdown_list"}>
                {UList.map(val => (
                  <p
                    data-id={val.id}
                    data-name={val.first_name}
                    data-surname={val.last_name}
                    onClick={handlerChooseUser}
                  >
                    {val.first_name + " " + val.last_name}
                  </p>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <h3>Annotations</h3>
          <div className={"messages"}>
            {messages &&
              messages.map((value, index) => (
                <div className={"info"}>
                  <div className={"username"}>
                    <span>
                      {value.author.first_name + " " + value.author.last_name}
                    </span>
                    <span className={"date"}>
                      {moment(value.createdAt).format("YYYY-MM-DD hh:mm")}
                    </span>
                  </div>
                  <p key={index}>{value.message}</p>
                </div>
              ))}
          </div>

          <div className={"reply-wrapper"}>
            <input
              value={currentMessage}
              className={"reply-input"}
              placeholder={"Send reply"}
              onChange={handlerSendChange}
              type="text"
            />
            <button onClick={handlerSend}>Reply</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default connect(
  state => ({
    currentMessages: state.admin.currentMessages,
    userList: state.admin.data,
    chattingUsers: state.admin.chattingUsers,
    message: state.admin.message,
    isAuthenticated: isAuthenticated(state)
  }),
  {
    getUsersList,
    getCurrentChat,
    sendCurrentMessage,
    getChattingUsers,
    sendCurrentMessageSuccess
  }
)(Chat);
