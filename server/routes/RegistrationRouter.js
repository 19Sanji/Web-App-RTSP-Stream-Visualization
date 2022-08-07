const Router = require("express");
const router = new Router();

const RegistrationController = require("../controllers/RegistrationController");

router.post("/", RegistrationController.CheckLoginAndAddUser);

module.exports = router;