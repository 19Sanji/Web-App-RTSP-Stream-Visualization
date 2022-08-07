import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import userData from "../store/userData";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "../store/userData";


function Login ()  {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [ErrorSpan, setErrorSpan] = React.useState("");
  let navigate = useNavigate();

  React.useEffect(() => {
    userData.LogOut()
  }, [])
  

  async function Go() {
    if (password === "" || login === "") {
      setErrorSpan("Поля логин и пароль обязательны должны быть заполненны");
    } else {
      await axios
        .post("http://localhost:3001/login", {
          login,
          password,
        })
        .then((res) => {
          if (res.data) {
            setErrorSpan("");
            userData.AuthUser(res.data);
            navigate("/work_room");
          } else {
            setErrorSpan("Пользователь не найден");
          }
        });
    }
  }

  return (
    <div className="log_div">
      <form className="log_form">
        <h3>Введите логин и пароль</h3>
        <div className="mySpan">
          <span>{ErrorSpan}</span>
        </div>
        <input
          placeholder="Введите логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        ></input>
        <input
          placeholder="Введите пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <Button onClick={Go}>Войти</Button>
      </form>
    </div>
  );
};
export default Login;
