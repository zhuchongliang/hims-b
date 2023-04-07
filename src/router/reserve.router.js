const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const reserveController = require("../controller/reserve.controller");
const reserveRouter = new Router({
  prefix: "/reserve"
})
reserveRouter.post("/list", verifyAuth, reserveController.getPageList.bind(reserveController));
reserveRouter.post("/search", verifyAuth, reserveController.searchPageList.bind(reserveController));
module.exports = reserveRouter;