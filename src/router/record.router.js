const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const recordController = require("../controller/record.controller");
const recordRouter = new Router({
  prefix: "/record"
})
recordRouter.get("/list", verifyAuth, recordController.getRecordList);
module.exports = recordRouter;