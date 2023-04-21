const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { addStock } = require("../middleware/stock.middleware")
const { verifyReserve } = require("../middleware/reserve.middleware")
const { createRecord } = require("../middleware/record.middware")
const outController  = require("../controller/out.controller");
const outRouter = new Router({
  prefix: "/out"
})
outRouter.post("/list", verifyAuth, outController.getPageList.bind(outController));
outRouter.post("/search", verifyAuth, outController.searchPageList.bind(outController));
outRouter.patch("/:id", verifyAuth, verifyReserve, addStock, outController.approveOutRequest, createRecord);
module.exports = outRouter;
