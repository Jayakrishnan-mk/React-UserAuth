const { adminRegister, adminLogin } = require("../Controllers/Ad_AuthController");
const { checkAdmin } = require("../Middlewares/Ad_AuthMiddlewares");

const adminRouter = require("express").Router();

adminRouter.post("/", checkAdmin);
adminRouter.post("/admin-register", adminRegister);
adminRouter.post("/admin-login", adminLogin);

module.exports = adminRouter;