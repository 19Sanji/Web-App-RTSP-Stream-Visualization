const db = require("../db");

class AdminPageController {
  async GetAllTablesData(req, res) {
    let users = await db.query(
      'SELECT * FROM "Пользователь" ORDER BY id_пользователя DESC'
    );
    let companys = await db.query(
      'SELECT * FROM "Компания" ORDER BY id_компании DESC'
    );
    let cameras = await db.query(
      'SELECT * FROM "IP_камера" ORDER BY id_камеры DESC'
    );
    let themes = await db.query('SELECT * FROM "Тема" ORDER BY id_темы DESC');
    let userCameras = await db.query(
      'SELECT * FROM "Доступная_пользователю_камера" ORDER BY id_доступной_камеры DESC'
    );
    let result = [];
    result.push(users.rows);
    result.push(companys.rows);
    result.push(cameras.rows);
    result.push(themes.rows);
    result.push(userCameras.rows);
    res.send(result);
  }

  async AddIpCam(req, res) {
    try {
      const result = await db.query(
        'INSERT INTO public."IP_камера"(Адрес, Локация) VALUES ($1,$2);',
        [req.body.url, req.body.location]
      );
      res.send("Камера успешно добавлена");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }

  async AddSomePersonIpCam(req, res) {
    try {
      let id_camera = await db.query(
        'SELECT id_камеры FROM "IP_камера" WHERE Адрес = $1',
        [req.body.IpCamUrl]
      );

      let userData = req.body.User.split(" ");

      let id_user = await db.query(
        'SELECT id_пользователя FROM "Пользователь" WHERE Фамилия = $1 AND Имя = $2 AND Отчество = $3',
        [userData[0], userData[1], userData[2]]
      );

      const result = await db.query(
        'INSERT INTO public."Доступная_пользователю_камера"(id_камеры, id_пользователя) VALUES ($1,$2);',
        [id_camera.rows[0].id_камеры, id_user.rows[0].id_пользователя]
      );
      res.send("Камера успешно добавлена");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }

  async DeleteIpCam(req, res) {
    try {
      let id_camera = await db.query(
        'SELECT id_камеры FROM "IP_камера" WHERE Адрес = $1',
        [req.body.deleteSelectedUrl]
      );
      // let id_d_camera = await db.query(
      //   'SELECT id_доступной_камеры FROM "Доступная_пользователю_камера" WHERE id_камеры = $1',
      //   [id_camera.rows[0].id_камеры]
      // );
      // await db.query(
      //   'DELETE FROM "Журнал_происшествий" WHERE id_доступной_камеры = $1',
      //   [id_d_camera.rows[0].id_доступной_камеры]
      // );
      await db.query(
        'DELETE FROM "Доступная_пользователю_камера" WHERE id_камеры = $1',
        [id_camera.rows[0].id_камеры]
      );

      let result = await db.query(
        'DELETE FROM "IP_камера" WHERE id_камеры = $1',
        [id_camera.rows[0].id_камеры]
      );

      res.send("Камера успешно удалена");
    } catch (error) {
      res.send("Произошла ошибка: " + error);
    }
  }
}

module.exports = new AdminPageController();
