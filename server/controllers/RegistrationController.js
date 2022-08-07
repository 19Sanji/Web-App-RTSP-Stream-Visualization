const db = require("../db");

class RegistrationController {
  async CheckLoginAndAddUser(req, res) {
    const user = await db.query(
      'SELECT * FROM "Пользователь" WHERE Логин=$1 AND Пароль=$2',
      [req.body.login, req.body.password]
    );
    if (!user.rows[0]) {
      const user = await db.query(
        'INSERT INTO public."Пользователь"(Фамилия, Имя, Отчество, Логин, Пароль) VALUES ($1,$2,$3,$4,$5);',
        [req.body.surname, req.body.name, req.body.patronymic, req.body.login , req.body.password]
      );
      res.send("Пользователь успешно зарегистрирован")
    } else {
      res.send(
        "Пользователь с данным логином уже зарегистрирован! Придумайте пожалуйста новый"
      );
    }
  }
}

module.exports = new RegistrationController();
