const db = require("../db");

class LoginController {

  async GetUser(req, res) {
    const user = await db.query(
      'SELECT * FROM "Пользователь" WHERE Логин=$1 AND Пароль=$2',
      [req.body.login, req.body.password]
    );
    if(!user.rows[0]){
      res.send()
    }
    else res.send(user.rows);
  }
}

module.exports = new LoginController();
