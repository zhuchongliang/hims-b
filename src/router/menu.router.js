const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const menuController  = require("../controller/menu.controller");
const menuRouter = new Router({
  prefix: "/menu"
})
menuRouter.post("/list", verifyAuth, menuController.getPageList.bind(menuController));
menuRouter.get("/info", verifyAuth, menuController.getMenuItemName);
menuRouter.get("/list", verifyAuth, menuController.getMenuListAll);
menuRouter.post("/search", verifyAuth, menuController.searchPageList.bind(menuController));
menuRouter.patch("/:id", verifyAuth, menuController.updatePageItem.bind(menuController));
module.exports = menuRouter;
