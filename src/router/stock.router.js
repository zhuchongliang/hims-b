const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const stockController = require("../controller/stock.controller");
const stockRouter = new Router({
  prefix: "/stock/:officeId"
})
stockRouter.post("/list", verifyAuth, stockController.getStockInfo);
stockRouter.post("/search", verifyAuth, stockController.searchStockInfo);
stockRouter.delete("/:id", verifyAuth, stockController.deletePageItem.bind(stockController));
stockRouter.delete("/", verifyAuth, stockController.deletePageList.bind(stockController)),
module.exports = stockRouter;