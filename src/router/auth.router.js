const Router = require("koa-router");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");
const { createRecord } = require("../middleware/record.middware")
const { login, success } = require("../controller/auth.controller");
const loginRouter = new Router({
  prefix: "/login"
})
loginRouter.post("/", verifyLogin, login, createRecord);
loginRouter.get("/test", verifyAuth, success);
module.exports = loginRouter;