const Router = require("express");
const router = new Router();

const JournalController = require("../controllers/JournalController");

router.delete("/", JournalController.DeleteIncident);

router.post("/", JournalController.UpdateIncident);

router.get("/", JournalController.GetAllData);

router.get("/themes", JournalController.GetAllThemes);

module.exports = router;
