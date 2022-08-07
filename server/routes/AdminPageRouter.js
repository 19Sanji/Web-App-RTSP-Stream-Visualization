const Router = require("express");
const router = new Router();

const AdminPageController = require("../controllers/AdminPageController");

router.get("/", AdminPageController.GetAllTablesData);

router.post("/add_person_ipcam", AdminPageController.AddSomePersonIpCam);

router.post("/add_ipcam", AdminPageController.AddIpCam);

router.delete("/delete_ipcam", AdminPageController.DeleteIpCam);

module.exports = router;