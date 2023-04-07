const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyStock } = require("../middleware/stock.middleware");
const prescriptionController = require("../controller/prescription.controller");
const prescriptionRouter = new Router({
  prefix: "/prescription/:officeId"
})
prescriptionRouter.post("/", verifyAuth, verifyStock, prescriptionController.createPageItem.bind(prescriptionController)),
prescriptionRouter.post("/list", verifyAuth, prescriptionController.getPrescriptionInfo);
prescriptionRouter.post("/search", verifyAuth, prescriptionController.searchPrescriptionInfo);
prescriptionRouter.delete("/:id", verifyAuth, prescriptionController.deletePageItem.bind(prescriptionController));
prescriptionRouter.delete("/", verifyAuth, prescriptionController.deletePageList.bind(prescriptionController)),
module.exports = prescriptionRouter;