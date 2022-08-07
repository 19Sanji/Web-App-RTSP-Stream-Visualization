const Router = require("express");
const router = new Router();

const LoginController = require("../controllers/LoginController");

router.post("/", LoginController.GetUser);

module.exports = router;