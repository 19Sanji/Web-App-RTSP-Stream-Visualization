import React from "react";
import axios from "axios";
import Journal_edit_form from "./Journal_edit_form";
import trash_basket from "../img/trash_white.png";
import edit from "../img/editing_white.png";
import "../styles/Journal_item.css";
import "../styles/Journal_edit_form.css";

export default function Journal_item({ data, themes }) {
  const [FormVisible, setFormVisible] = React.useState(false);
  const [myValue, setMyValue] = React.useState("");
  const [myUser, setMyUser] = React.useState("");
  const [myUserId, setMyUserId] = React.useState();
  const [myCam, setMyCam] = React.useState("");

  data.formVisible = FormVisible;

  React.useEffect(() => {
    if (themes) {
      for (let item in themes) {
        if (data.id_темы === themes[item].id_темы) {
          setMyValue(themes[item].Название);
        }
      }
    }
    console.log(myValue);

    console.log(themes);
    // for (let item in users) {
    //   if (data.id_пользователя === users[item].id_пользователя) {
    //     setMyUser(users[item].Фамилия+ " "+ users[item].Имя);
    //     setMyUserId(users[item].id_пользователя);
    //   }
    // }
    // console.log(myUser)
    // for (let item in cameras) {
    //   if (data.id_камеры === cameras[item].id_камеры) {
    //     setMyCam(cameras[item].Адрес);
    //   }
    // }
  }, [data, themes, myValue]);

  return (
    <div className="journal_item">
      <table className="my_table">
        <tbody>
          <tr>
            <td className="td1">{data.id_происшествия}</td>
            <td className="td2">{data.Название}</td>
            <td className="td3">{data.Описание}</td>
            <td className="td2">{data.Адрес}</td>
            <td className="td5">
              {data.Фамилия} {data.Имя} {data.Отчество}
            </td>
            <td className="td4">
              {data.Время[0] +
                data.Время[1] +
                data.Время[2] +
                data.Время[3] +
                data.Время[4]}
              <br />
              {data.Дата[0] +
                data.Дата[1] +
                data.Дата[2] +
                data.Дата[3] +
                data.Дата[4] +
                data.Дата[5] +
                data.Дата[6] +
                data.Дата[7] +
                data.Дата[8] +
                (+data.Дата[9] + 1)}
            </td>
            <td className="td5">
              <button
                className="edit_btn"
                onClick={() => {
                  setFormVisible(!data.formVisible);
                }}
              >
                <img src={edit} />
              </button>

              <button
                className="basket_btn"
                onClick={async () => {
                  const result = window.confirm("Вы уверены?");
                  if (result) {
                    await axios
                      .delete("http://localhost:3001/journal/", {
                        data: { id: data.id_происшествия },
                      })
                      .then((res) => {
                        console.log(res.data);
                      });
                  } else {
                    alert("Отмена");
                  }
                }}
              >
                <img src={trash_basket} />
              </button>
            </td>
          </tr>
          <tr
            className="journal_edit_form_tr"
            hidden={!data.formVisible ? "hidden" : ""}
          >
            <td colSpan="7">
              <Journal_edit_form
                id={data.id_происшествия}
                tema={data.Тема}
                text={data.Описание}
                themes={themes}
                user_id={myUserId}
                // setFormVisible={setFormVisible}
                // formVisible={FormVisible}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
