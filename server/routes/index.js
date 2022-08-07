const Router = require("express");
const router = new Router();

const WorkRoomRouter = require("./WorkRoomRouter");
const JournalRouter = require("./JournalRouter");
const AdminPageRouter = require("./AdminPageRouter");
const LoginRouter = require("./LoginRouter");
const RegistrationRouter = require("./RegistrationRouter");

router.use("/work_room", WorkRoomRouter);
router.use("/journal", JournalRouter);
router.use("/admin_page", AdminPageRouter);
router.use("/login", LoginRouter);
router.use("/registration", RegistrationRouter);

module.exports = router;
