import React from "react";
import axios from "axios";
import "../styles/Journal.css";
import Journal_item from "./Journal_item";
import "../styles/Journal_edit_form.css";
import { useNavigate } from "react-router-dom";

function Journal() {
  const [myTable, setMyTable] = React.useState([]);
  const [myThemes, setMyThemes] = React.useState([]);

  let navigate = useNavigate();

  async function RenderFunc() {
    await axios.get("http://localhost:3001/journal").then((res) => {
      setMyTable(res.data);
    });
    await axios.get("http://localhost:3001/journal/themes").then((res) => {
      setMyThemes(res.data);
    });
  }
  React.useEffect(() => {
    const sessionStorageUserData = JSON.parse(sessionStorage.getItem("user"));
    if(!sessionStorageUserData){
      navigate("/login");
    }
    RenderFunc();
  }, []);

  return (
    <div className="journal_page_content row">
      <div className="col-10">
        <h3 className="myh3">Журнал происшествий</h3>
        <table className="my_table">
          <tbody>
            <tr className="my_tr">
              <td className="td1">ID</td>
              <td className="td2">ТЕМА</td>
              <td className="td3">ОПИСАНИЕ</td>
              <td className="td2">КАМЕРА</td>
              <td className="td5">АВТОР</td>
              <td className="td4">ДАТА</td>
              <td className="td5"></td>
            </tr>
          </tbody>
        </table>
        {myTable.map((item, i) => (
          <Journal_item data={item} key={i} themes={myThemes} />
        ))}
      </div>
    </div>
  );
}

export default Journal;
