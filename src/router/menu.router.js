const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const menuController  = require("../controller/menu.controller");
const menuRouter = new Router({
  prefix: "/menu"
})
menuRouter.post("/list", verifyAuth, menuController.getMenuListAllCount);
menuRouter.get("/info", verifyAuth, menuController.getMenuItemName);
menuRouter.get("/list", verifyAuth, menuController.getMenuListAll);
module.exports = menuRouter;
