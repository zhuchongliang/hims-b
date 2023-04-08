const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { addReserve } = require("../middleware/reserve.middleware");
const purchaseController = require("../controller/purchase.controller");
const purchaseRouter = new Router({
  prefix: "/purchase"
})
purchaseRouter.post("/", verifyAuth, purchaseController.createPageItem.bind(purchaseController));
purchaseRouter.post("/list", verifyAuth, purchaseController.getPageList.bind(purchaseController));
purchaseRouter.post("/search", verifyAuth, purchaseController.searchPageList.bind(purchaseController));
purchaseRouter.patch("/:id", verifyAuth, addReserve, purchaseController.updatePageItem.bind(purchaseController)),
module.exports = purchaseRouter;