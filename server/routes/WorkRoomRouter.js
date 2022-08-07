const Router = require("express");
const router = new Router();

const WorkRoomController = require("../controllers/WorkRoomController");

router.post("/", WorkRoomController.AddNewIncident);

router.post("/get_cameras", WorkRoomController.GetUserCameras);

router.post("/stream", WorkRoomController.Stream);

router.get("/get_admin_cameras", WorkRoomController.GetAllCameras);

router.get("/get_themes", WorkRoomController.GetAllThemes);

module.exports = router;
