import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../styles/Journal_edit_form.css";

function Journal_edit_form({
  id,
  tema,
  text,
  themes,
  user_id,
  setFormVisible,
  formVisible,
}) {
  const [myTheme, setMyTheme] = React.useState([]);
  const [myText, setMyText] = React.useState("");
  const [Themes, setThemes] = React.useState([]);

  React.useEffect(() => {
    // setFormVisible(formVisible);
    setThemes(themes);
  }, [themes]);

  return (
    <div className="journal_edit_form row">
      <form action="">
        <span className="text-left">ID происшествия : </span>
        <span>{id}</span>
        <br></br>

        <span>Тема</span>
        <br></br>
        <select value={myTheme} onChange={(e) => setMyTheme(e.target.value)}>
          <option hidden>{tema ? tema : "Выберите тему"}</option>
          {Themes.map((theme) => (
            <option key={theme.id_темы}>{theme.Название}</option>
          ))}
        </select>
        <br></br>

        <span>Описание</span>
        <br></br>
        <textarea
          className="myInput"
          type="text"
          placeholder={text}
          value={myText}
          onChange={(e) => setMyText(e.target.value)}
        >
          {myText}
        </textarea>
        <br></br>
        <div className="formBtn">
          <Button
            onClick={async () => {
              const result = window.confirm("Сохранить изменения?");
              if (result) {
                await axios
                  .post("http://localhost:3001/journal", {
                    id: id,
                    tema: myTheme,
                    text: myText,
                    user_id: user_id,
                  })
                  .then((res) => {
                    console.log(res.data);
                  });
                alert(" Запись успешно отредактирована");
                // setFormVisible(!formVisible);
              } else {
                alert("Отмена действия");
                console.log(myTheme);
              }
            }}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Journal_edit_form;
