import React from "react";
import "../styles/Admin_page.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Admin_page() {
  const [thisTable, setThisTabel] = React.useState(0);
  const [myUsers, setMyUsers] = React.useState([]);
  const [myCompanys, setMyCompanys] = React.useState([]);
  const [myCameras, setMyCameras] = React.useState([]);
  const [myThemes, setMyThemes] = React.useState([]);
  const [myUserCameras, setMyUserCameras] = React.useState([]);

  const [Button1State, setButton1State] = React.useState(true);
  const [Button2State, setButton2State] = React.useState(true);
  const [Button3State, setButton3State] = React.useState(true);

  const [inputUrl, setInputUrl] = React.useState("");
  const [сamLocation, setCamLocation] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedUrl, setSelectedUrl] = React.useState("");
  const [deleteSelectedUrl, setDeleteSelectedUrl] = React.useState("");

  let navigate = useNavigate();

  let myTableHead = [];
  let myTable = [];

  async function LoadData() {
    await axios.get("http://localhost:3001/admin_page").then((res) => {
      setMyUsers(res.data[0]);
      setMyCompanys(res.data[1]);
      setMyCameras(res.data[2]);
      setMyThemes(res.data[3]);
      setMyUserCameras(res.data[4]);
    });
  }
  React.useEffect(() => {
    const sessionStorageUserData = JSON.parse(sessionStorage.getItem("user"));
    if (!sessionStorageUserData) {
      navigate("/login");
    }
    LoadData();

    if (сamLocation !== "" && inputUrl !== "") {
      setButton1State(false);
    } else {
      setButton1State(true);
    }

    if (selectedUrl && selectedUser) {
      setButton2State(false);
    } else {
      setButton2State(true);
    }

    if (deleteSelectedUrl !== "") {
      setButton3State(false);
    } else {
      setButton3State(true);
    }
  }, [
    сamLocation,
    inputUrl,
    deleteSelectedUrl,
    selectedUrl,
    selectedUser,
  ]);

  switch (thisTable) {
    case 1:
      myTableHead = (
        <tr>
          <td className="admin_page_td addcolor">id_компании</td>
          <td className="admin_page_td addcolor">Фамилия</td>
          <td className="admin_page_td addcolor">Имя</td>
          <td className="admin_page_td addcolor">Отчество</td>
          <td className="admin_page_td addcolor">Роль</td>
        </tr>
      );
      myTable = myUsers.map((user) => (
        <tr className="admin_page_tr" key={user.id_пользователя}>
          <td className="admin_page_td">{user.id_пользователя}</td>
          <td className="admin_page_td">{user.Фамилия}</td>
          <td className="admin_page_td">{user.Имя}</td>
          <td className="admin_page_td">{user.Отчество}</td>
          <td className="admin_page_td">{user.Роль}</td>
        </tr>
      ));
      break;
    case 2:
      myTableHead = (
        <tr>
          <td className="admin_page_td addcolor">id_компании</td>
          <td className="admin_page_td addcolor">Наименование</td>
          <td className="admin_page_td addcolor">Адрес</td>
        </tr>
      );
      myTable = myCompanys.map((company) => (
        <tr className="admin_page_tr" key={company.id_компании}>
          <td className="admin_page_td">{company.id_компании}</td>
          <td className="admin_page_td">{company.Наименование}</td>
          <td className="admin_page_td">{company.Адрес}</td>
        </tr>
      ));
      break;
    case 3:
      myTableHead = (
        <tr>
          <td className="admin_page_td addcolor">id_камеры</td>
          <td className="admin_page_td addcolor">Адрес</td>
          <td className="admin_page_td addcolor">Локация</td>
        </tr>
      );
      myTable = myCameras.map((camera) => (
        <tr className="admin_page_tr" key={camera.id_камеры}>
          <td className="admin_page_td">{camera.id_камеры}</td>
          <td className="admin_page_td">{camera.Адрес}</td>
          <td className="admin_page_td">{camera.Локация}</td>
        </tr>
      ));
      break;
    case 4:
      myTableHead = (
        <tr>
          <td className="admin_page_td addcolor">id_темы</td>
          <td className="admin_page_td addcolor">Название</td>
        </tr>
      );
      myTable = myThemes.map((theme) => (
        <tr className="admin_page_tr" key={theme.id_темы}>
          <td className="admin_page_td">{theme.id_темы}</td>
          <td className="admin_page_td">{theme.Название}</td>
        </tr>
      ));
      break;
    case 5:
      myTableHead = (
        <tr>
          <td className="admin_page_td addcolor">id_доступной_камеры</td>
          <td className="admin_page_td addcolor">id_камеры</td>
          <td className="admin_page_td addcolor">id_пользователя</td>
        </tr>
      );
      myTable = myUserCameras.map((userCamera) => (
        <tr className="admin_page_tr" key={userCamera.id_доступной_камеры}>
          <td className="admin_page_td">{userCamera.id_доступной_камеры}</td>
          <td className="admin_page_td">{userCamera.id_камеры}</td>
          <td className="admin_page_td">{userCamera.id_пользователя}</td>
        </tr>
      ));
      break;
      case 6:
        myTableHead = []
        myTable = []
        break;
  }

  return (
    <div className="admin_page row">
      <div className="my_interface">
        <Button
          onClick={() => {
            setThisTabel(1);
          }}
        >
          Таблица пользователь
        </Button>
        <Button
          onClick={() => {
            setThisTabel(2);
          }}
        >
          Таблица компании
        </Button>
        <Button
          onClick={() => {
            setThisTabel(3);
          }}
        >
          Таблица ip-камеры
        </Button>
        <Button
          onClick={() => {
            setThisTabel(4);
          }}
        >
          Таблица темы
        </Button>
        <Button
          onClick={() => {
            setThisTabel(5);
          }}
        >
          Таблица Доступные пользователю камеры
        </Button>
        <Button
          onClick={() => {
            setThisTabel(6);
          }}
        >
          Скрыть
        </Button>
      </div>

      <div className="admin_page_table col-10">
        <table>
          <tbody>
            {myTableHead}
            {myTable}
          </tbody>
        </table>
      </div>

      <div className="admin_page_add_ip col-10">
        <h3>Добавить IP-камеру</h3>

        <input
          type="text"
          value={inputUrl}
          placeholder="Введите адрес IP камеры"
          onChange={(e) => setInputUrl(e.target.value)}
          className="myInput"
        />
        <br />

        <input
          type="text"
          value={сamLocation}
          placeholder="Введите название локации"
          onChange={(e) => setCamLocation(e.target.value)}
          className="myInput"
        />

        <Button
          disabled={Button1State}
          onClick={async () => {
            await axios
              .post("http://localhost:3001/admin_page/add_ipcam", {
                url: inputUrl,
                location: сamLocation
              })
              .then((message) => {
                alert(message.data);
              });
          }}
        >
          Добавить
        </Button>
      </div>

      <div className="admin_page_add_ip col-10">
        <h3>Добавить пользователю IP-камеру</h3>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option hidden>Выберите пользователя</option>
          {myUsers.map((user) => (
            <option key={user.id_пользователя}>
              {user.Фамилия} {user.Имя} {user.Отчество}
            </option>
          ))}
        </select>
        <br />
        <select
          value={selectedUrl}
          onChange={(e) => setSelectedUrl(e.target.value)}
        >
          <option hidden>Выберите адрес</option>
          {myCameras.map((camera) => (
            <option key={camera.id_камеры}>{camera.Адрес}</option>
          ))}
        </select>

        <Button
          disabled={Button2State}
          onClick={async () => {
            await axios
              .post("http://localhost:3001/admin_page/add_person_ipcam", {
                IpCamUrl: selectedUrl,
                User: selectedUser,
              })
              .then((message) => {
                alert(message.data);
              });
          }}
        >
          Добавить
        </Button>
      </div>

      <div className="admin_page_add_ip col-10">
        <h3>Удалить IP-камеру</h3>

        <select
          value={deleteSelectedUrl}
          onChange={(e) => setDeleteSelectedUrl(e.target.value)}
        >
          <option hidden>Выберите адрес</option>
          {myCameras.map((camera) => (
            <option key={camera.id_камеры}>{camera.Адрес}</option>
          ))}
        </select>

        <Button
          disabled={Button3State}
          onClick={async () => {
            await axios
              .delete("http://localhost:3001/admin_page/delete_ipcam", {
                data: { deleteSelectedUrl: deleteSelectedUrl },
              })
              .then((message) => {
                alert(message.data);
              });
          }}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
export default Admin_page;
