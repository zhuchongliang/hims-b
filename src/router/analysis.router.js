const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const analysisController = require("../controller/analysis.controller");
const analysisRouter = new Router({
  prefix: "/analysis"
})
analysisRouter.get("/prescription", verifyAuth, analysisController.getAllDrugUseCount);
analysisRouter.get("/purchase", verifyAuth, analysisController.getAllPurchaseCount);
analysisRouter.get("/amount", verifyAuth, analysisController.getTopPanelData);
module.exports = analysisRouter; 