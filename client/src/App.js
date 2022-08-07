import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";

import "./styles/App.css";
import "./styles/NavBar.css";
import "./styles/Registration.css";
import "./styles/Login.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Journal from "./components/Journal";
import Admin_page from "./components/Admin_page";
import WorkRoom from "./components/WorkRoom";
import { observer } from "mobx-react-lite";
import userData from "../src/store/userData";

const App = observer(() => {
  const [userIsAuth, setUserIsAuth] = React.useState(false);
  React.useEffect(() => {
    if (
      userData.Фамилия === "" &&
      userData.Имя === "" &&
      userData.Отчество === "" &&
      userData.Логин === "" &&
      userData.Пароль === "" &&
      userData.Роль === ""
    ) {
      console.log("Не авторизован");
      setUserIsAuth(false);
    } else {
      console.log("Авторизован");
      setUserIsAuth(true);
    }
  }, [
    userData.UserIsAuth,
    userData.StorageUserData
  ]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar userIsAuth={userIsAuth} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin_page" element={<Admin_page />} />
          <Route path="/work_room" element={<WorkRoom />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
});

export default App;
