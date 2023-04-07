const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const drugController = require("../controller/drug.controller");
const drugRouter = new Router({
  prefix: "/drug"
})
drugRouter.post("/", verifyAuth, drugController.createPageItem.bind(drugController)),
drugRouter.post("/list", verifyAuth, drugController.getPageList.bind(drugController));
drugRouter.post("/search", verifyAuth, drugController.searchPageList.bind(drugController));
drugRouter.delete("/:id", verifyAuth, drugController.deletePageItem.bind(drugController));
drugRouter.delete("/", verifyAuth, drugController.deletePageList.bind(drugController));
drugRouter.patch("/", verifyAuth, drugController.updatePageItem.bind(drugController));
module.exports = drugRouter; 