import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../styles/NewIncident.css";
import userData from "../store/userData";

function NewIncident({ myThemes, myUrl, thisUser }) {
  const [btnState, setBtnState] = React.useState(true);
  const [myArea, setMyArea] = React.useState("");
  const [selectedUrl, setSelectedUrl] = React.useState("");
  const [selectedTheme, setSelectedTheme] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const sessionStorageUserData = JSON.parse(sessionStorage.getItem("user"));
    if (sessionStorageUserData[0].Роль === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    if (myUrl && selectedTheme && myArea) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  }, [userData.StorageUserData, myUrl,selectedTheme,myArea]);

  async function AddNewIncident() {
    let thisDate = new Date();
    // let myTime = "";
    let myTime = thisDate.getHours() + ":" + thisDate.getMinutes()  ;

    // if (+thisDate.getHours() < 10 && +thisDate.getMinutes() < 10) {
    //   myTime = "0" + thisDate.getHours() + ":0" + thisDate.getMinutes();
    // }
    // if (+thisDate.getHours() > 10 && +thisDate.getMinutes() < 10) {
    //   myTime = thisDate.getHours() + ":0" + thisDate.getMinutes();
    // }
    // if (+thisDate.getHours() < 10 && +thisDate.getMinutes() > 10) {
    //   myTime = "0" + thisDate.getHours() + ":" + thisDate.getMinutes();
    // }
    // if (+thisDate.getHours() > 10 && +thisDate.getMinutes() > 10) {
    //   myTime = thisDate.getHours() + ":" + thisDate.getMinutes();
    // }

    let myDate = "";
    if (+(thisDate.getMonth() + 1) < 10 && +thisDate.getDate() < 10) {
      myDate =
        thisDate.getFullYear() +
        "-0" +
        (thisDate.getMonth() + 1) +
        "-0" +
        thisDate.getDate();
    }
    if (+(thisDate.getMonth() + 1) > 10 && +thisDate.getDate() < 10) {
      myDate =
        thisDate.getFullYear() +
        "-" +
        (thisDate.getMonth() + 1) +
        "-0" +
        thisDate.getDate();
    }
    if (+(thisDate.getMonth() + 1) < 10 && +thisDate.getDate() > 10) {
      myDate =
        thisDate.getFullYear() +
        "-0" +
        (thisDate.getMonth() + 1) +
        "-" +
        thisDate.getDate();
    }
    if (+(thisDate.getMonth() + 1) > 10 && +thisDate.getDate() > 10) {
      myDate =
        thisDate.getFullYear() +
        "-" +
        (thisDate.getMonth() + 1) +
        "-" +
        thisDate.getDate();
    }
    await axios
      .post("http://localhost:3001/work_room", {
        selectedTheme,
        thisUser,
        myUrl,
        myArea,
        myDate,
        myTime,
        isAdmin
      })
      .then((res) => {
        console.log(res);
        setMyArea("");
      });
  }
  return (
    <form className="newIncident_form col-10">
      <h2>Добавить новую запись в журнал происшествий</h2>
      <span>Тема</span>
      <br></br>
      <select
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
      >
        <option hidden>Выберите тему</option>
        {myThemes.map((theme) => (
          <option key={theme.id_темы}>{theme.Название}</option>
        ))}
      </select>
      <br></br>
      <span>Адрес</span>
      <br></br>
      <input type="text" className="myInput" disabled={true} value={myUrl} />
      <br></br>
      <span>Описание</span>
      <br></br>
      <textarea
        className="myInput"
        type="text"
        placeholder={"Опишите, что произошло"}
        value={myArea}
        onChange={(e) => {
          setMyArea(e.target.value);
        }}
      ></textarea>
      <br></br>

      <div className="newIncident_btn">
        <Button disabled={btnState} onClick={AddNewIncident}>
          Сохранить
        </Button>
      </div>
    </form>
  );
}
export default NewIncident;
