const db = require("../db");
const rtsp = require("rtsp-ffmpeg");
const server_io = require("../socket");

class WorkRoomController {
  async AddNewIncident(req, res) {
    let id_theme = await db.query(
      'SELECT id_темы FROM "Тема" WHERE "Название" = $1',
      [req.body.selectedTheme]
    );
    let id_user = req.body.thisUser[0].id_пользователя;
    let id_cam = await db.query(
      'SELECT id_камеры FROM "IP_камера" WHERE Адрес=$1',
      [req.body.myUrl]
    );
    if (req.body.isAdmin) {
      await db.query(
        'INSERT INTO public."Доступная_пользователю_камера"(id_камеры, id_пользователя) VALUES ($1,$2);',
        [id_cam.rows[0].id_камеры, id_user]
      );
      let id_dostup_cam = await db.query(
        'SELECT id_доступной_камеры FROM "Доступная_пользователю_камера" WHERE id_камеры = $1 AND id_пользователя=$2',
        [id_cam.rows[0].id_камеры, id_user]
      );
      const result = await db.query(
        'INSERT INTO public."Журнал_происшествий"( Описание, Дата, Время,id_темы,id_пользователя,id_доступной_камеры) VALUES ($1,$2,$3,$4,$5,$6);',
        [
          req.body.myArea,
          req.body.myDate,
          req.body.myTime,
          id_theme.rows[0].id_темы,
          id_user,
          id_dostup_cam.rows[0].id_доступной_камеры,
        ]
      );
    } else {
      let id_dostup_cam = await db.query(
        'SELECT id_доступной_камеры FROM "Доступная_пользователю_камера" WHERE id_камеры = $1 AND id_пользователя=$2',
        [id_cam.rows[0].id_камеры, id_user]
      );
      const result = await db.query(
        'INSERT INTO public."Журнал_происшествий"( Описание, Дата, Время,id_темы,id_пользователя,id_доступной_камеры) VALUES ($1,$2,$3,$4,$5,$6);',
        [
          req.body.myArea,
          req.body.myDate,
          req.body.myTime,
          id_theme.rows[0].id_темы,
          id_user,
          id_dostup_cam.rows[0].id_доступной_камеры,
        ]
      );
    }

    res.send("Все хорошо");
  }

  async GetUserCameras(req, res) {
    let cameras = await db.query(
      'SELECT p.Фамилия, ip.id_камеры, ip.Адрес FROM "Пользователь" p, "IP_камера" ip, "Доступная_пользователю_камера" d WHERE p.id_пользователя = d.id_пользователя AND ip.id_камеры = d.id_камеры AND d.id_пользователя = $1',
      [req.body.thisUserId]
    );
    res.send(cameras.rows);
  }

  async GetAllThemes(req, res) {
    let themes = await db.query('SELECT * FROM "Тема" ORDER BY id_темы DESC');
    res.send(themes.rows);
  }

  async GetAllCameras(req, res) {
    let cameras = await db.query(
      'SELECT * FROM "IP_камера" ORDER BY id_камеры DESC'
    );
    res.send(cameras.rows);
  }

  async Stream(req, res) {
    console.log(req.body);

    const io = server_io.getIO();

    const uri = req.body.url;
    let stream = new rtsp.FFMpeg({ input: uri });

    io.on("connection", function (socket) {
      if (req.body.connectStop) {
        console.log("must be stop");
      }
      if (req.body.url && req.body.connectStart) {
        socket.on("start", function () {
          stream.on("data", function (data) {
            socket.emit("data", data.toString("base64"));
          });
        });
        socket.on("disconnect", function () {
          socket.disconnect();
          // server_io.closeConn();
          stream.removeListener("data", function (data) {
            socket.emit("data", data.toString("base64"));
          });
          stream.stop();
          console.log("DISCONNECT");
        });
      }
    });
    res.send("норм");
  }
}

module.exports = new WorkRoomController();
