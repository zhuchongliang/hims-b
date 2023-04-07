const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { addStock } = require("../middleware/stock.middleware")
const outController  = require("../controller/out.controller");
const outRouter = new Router({
  prefix: "/out"
})
outRouter.post("/list", verifyAuth, outController.getPageList.bind(outController));
outRouter.post("/search", verifyAuth, outController.searchPageList.bind(outController));
outRouter.patch("/:id", verifyAuth, addStock, outController.updatePageItem.bind(outController));
module.exports = outRouter;
