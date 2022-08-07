import React from "react";
import { Button } from "react-bootstrap";
import userData from "../store/userData";
import "../styles/Main.css";
import { useNavigate } from "react-router-dom";
import lupa from "../img/lupa.png";
import security from "../img/security.png";
import tablet from "../img/tablet.png";
import shield from "../img/shield.png";

function Main() {
  let navigate = useNavigate();
  React.useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    // <div className="main_page_content row">
    //   <img className="main_img" src={main_img} />
    //   <div className="col-10">
    //     <span>asd
    //     </span>
    //   </div>
    // </div>
    <div className="main_page row">
      <div className="main_page_content">
        <div className="main_page_block">
          Готовое решение для мониторинга на предприятии
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Начать пользоваться
          </Button>
        </div>
      </div>
      <div className="main_page_info col-10">
        <h3>Проблемы, которые может решить мониторинг</h3>
        <div className="main_page_info_carts">
          <div className="cart">
            <img className="cart_img" src={shield} />
            <span className="cart_span">Безопасность</span>
          </div>
          <div className="cart">
            <img className="cart_img" src={tablet} />
            <span className="cart_span">
              Контроль технологического процесса
            </span>
          </div>
          <div className="cart">
            <img className="cart_img" src={security} />
            <span className="cart_span">Наблюдение за персоналом</span>
          </div>
          <div className="cart">
            <img className="cart_img" src={lupa} />
            <span className="cart_span">
              Выяснение причин возникновения чрезвычайного происшествия
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
