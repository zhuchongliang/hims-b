const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const enterController = require("../controller/enter.controller");
const enterRouter = new Router({
  prefix: "/enter/:officeId"
})
enterRouter.post("/", verifyAuth, enterController.createPageItem.bind(enterController)),
enterRouter.post("/list", verifyAuth, enterController.getEnterInfo);
enterRouter.post("/search", verifyAuth, enterController.searchEnterInfo);
enterRouter.delete("/:id", verifyAuth, enterController.deletePageItem.bind(enterController));
enterRouter.delete("/", verifyAuth, enterController.deletePageList.bind(enterController)),
module.exports = enterRouter; 