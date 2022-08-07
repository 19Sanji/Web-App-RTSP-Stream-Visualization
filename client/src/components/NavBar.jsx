import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import userData from "../store/userData";

function NavBar(userIsAuth) {
  const [LogoutLinkVisible, setLogoutLinkVisible] = React.useState(false);
  const [LoginLinkVisible, setLoginLinkVisible] = React.useState(false);
  const [JournalLinkVisible, setJournalLinkVisible] = React.useState(false);
  const [WorkRoomLinkVisible, setWorkRoomLinkVisible] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const sessionStorageUserData = JSON.parse(sessionStorage.getItem("user"));
    if (sessionStorageUserData) {
      setLoginLinkVisible(true);
      setLogoutLinkVisible(false);
      setJournalLinkVisible(false);
      setWorkRoomLinkVisible(false);
      if (sessionStorageUserData[0].Роль === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setLoginLinkVisible(false);
      setLogoutLinkVisible(true);
      setJournalLinkVisible(true);
      setWorkRoomLinkVisible(true);
      setIsAdmin(false);
    }
  }, [userIsAuth, userData.UserIsAuth, userData.StorageUserData]);
  return (
    <div className="navbar sticky-top">
      <div className="logo">
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <div className="navbar__links">
        <Link to="/work_room" hidden={WorkRoomLinkVisible}>
          Рабочая страница
        </Link>
        <Link to="/admin_page" hidden={!isAdmin}>
          Страница админа
        </Link>
        <Link to="/journal" hidden={JournalLinkVisible}>
          Журнал
        </Link>
        <Link to="/registration">Регистрация</Link>
        <Link to="/login" hidden={LoginLinkVisible}>
          Вход
        </Link>
        <Link
          hidden={LogoutLinkVisible}
          onClick={() => {
            userData.LogOut();
            console.log(userData);
          }}
          to="/"
        >
          Выход
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
