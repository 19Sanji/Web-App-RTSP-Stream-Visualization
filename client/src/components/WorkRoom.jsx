import React from "react";
import axios from "axios";
import "../styles/WorkRoom.css";
import NewIncident from "./NewIncident";
import Stream from "./Stream";
import userData from "../store/userData";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function WorkRoom() {
  let navigate = useNavigate();
  const [myCameras, setMyCameras] = React.useState([]);
  const [myThemes, setMyThemes] = React.useState([]);
  const [selectedUrl, setSelectedUrl] = React.useState("");
  const [myRender, setMyRender] = React.useState(false);
  const [thisUser, setThisUser] = React.useState({});
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [connectStart, setConnectStart] = React.useState();
  const [connectStop, setConnectStop] = React.useState();

  const [btnState, setBtnState] = React.useState(false);

  async function LoadData(thisUserId) {
    await axios
      .get("http://localhost:3001/work_room/get_themes")
      .then((res) => {
        setMyThemes(res.data);
      });
    if (isAdmin) {
      await axios
        .get("http://localhost:3001/work_room/get_admin_cameras")
        .then((res) => {
          setMyCameras(res.data);
        });
    } else {
      await axios
        .post("http://localhost:3001/work_room/get_cameras", {
          thisUserId,
        })
        .then((res) => {
          setMyCameras(res.data);
        });
    }
  }

  React.useEffect(() => {
    userData.GetUser();
    const sessionStorageUserData = JSON.parse(sessionStorage.getItem("user"));
    if (!sessionStorageUserData) {
      navigate("/login");
    }
    if (sessionStorageUserData[0].Роль === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setThisUser(JSON.parse(userData.StorageUserData));
    if (thisUser[0]) {
      LoadData(thisUser[0].id_пользователя);
    }
    if (selectedUrl !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
    if (myThemes) {
      setMyRender(true);
    } else setMyRender(false);
  }, [
    userData.StorageUserData,
    myRender,
    selectedUrl,
    connectStart,
    connectStop,
  ]);
  return (
    <div className="workroom_content row">
      <div className="interface col-10">
        <div className="myH3">
          <h3>Выбор адреса IP-камеры</h3>
        </div>
        <div className="myInterface">
          <select
            value={selectedUrl}
            onChange={(e) => setSelectedUrl(e.target.value)}
          >
            <option hidden>Выберите адрес</option>
            {myCameras.map((camera) => (
              <option key={camera.id_доступной_камеры}>{camera.Адрес}</option>
            ))}
          </select>
          <Button
            disabled={!btnState}
            onClick={() => {
              setConnectStart(true);
              setConnectStop(false);
            }}
          >
            Запустить
          </Button>
          <Button
            disabled={!btnState}
            onClick={() => {
              setConnectStart(false);
              setConnectStop(true);
            }}
          >
            Стоп
          </Button>
        </div>
      </div>
      <div className="stream col-10">
        <Stream
          streamUrl={selectedUrl}
          connectStart={connectStart}
          connectStop={connectStop}
        />
      </div>
      <NewIncident myThemes={myThemes} myUrl={selectedUrl} thisUser={thisUser} />
    </div>
  );
}

export default WorkRoom;
