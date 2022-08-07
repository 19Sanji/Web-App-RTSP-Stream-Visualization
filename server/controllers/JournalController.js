const db = require("../db");

class JournalController {
  async DeleteIncident(req, res) {
    const result = await db.query(
      'DELETE FROM "Журнал_происшествий" WHERE id_происшествия = $1;',
      [req.body.id]
    );
    res.send("Все хорошо");
  }

  async GetAllData(req, res) {
    const incidents = await db.query(
      'SELECT j.id_происшествия, j.Описание, j.Дата, j.Время, p.id_пользователя, p.Фамилия, p.Имя, p.Отчество, ip.id_камеры, ip.Адрес, t.Название FROM "Журнал_происшествий" j, "Пользователь" p, "IP_камера" ip, "Доступная_пользователю_камера" d, "Тема" t WHERE p.id_пользователя = j.id_пользователя AND ip.id_камеры = d.id_камеры AND j.id_доступной_камеры = d.id_доступной_камеры AND t.id_темы = j.id_темы' 
    );
    res.send(incidents.rows);
  }

  async GetAllThemes(req, res) {
    let themes = await db.query('SELECT * FROM "Тема" ORDER BY id_темы DESC');
    res.send(themes.rows);
  }

  async UpdateIncident(req, res) {
    const result = await db.query(
      'SELECT "id_темы" FROM "Тема" WHERE "Название"=$1;',
      [req.body.tema]
    );
    const theme_id = result.rows[0].id_темы;
    const result1 = await db.query(
      'UPDATE Журнал_происшествий SET "Описание"=$1, "id_темы"=$2 WHERE "id_происшествия"=$3;',
      [req.body.text, theme_id, req.body.id]
    );
    res.send(result1.rows);
  }
}

module.exports = new JournalController();
