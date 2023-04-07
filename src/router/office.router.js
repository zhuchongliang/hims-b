const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const officeController = require("../controller/office.controller");
const officeRouter = new Router({
  prefix: "/officeInfo"
})
officeRouter.post("/", verifyAuth, officeController.createPageItem.bind(officeController));
officeRouter.post("/list", verifyAuth, officeController.getPageList.bind(officeController));
officeRouter.post("/search", verifyAuth, officeController.searchPageList.bind(officeController));
officeRouter.delete("/:id", verifyAuth, officeController.deletePageItem.bind(officeController));
officeRouter.delete("/", verifyAuth, officeController.deletePageList.bind(officeController)),
officeRouter.patch("/:id", verifyAuth, officeController.updatePageItem.bind(officeController)),
module.exports = officeRouter;