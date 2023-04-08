const prescriptionService = require("../service/prescription.service");
const purchaseService = require("../service/purchase.service");
class AnalysisController {
  async getAllDrugUseCount(ctx, next) {
    const result = await prescriptionService.getAllDrugUseCount();
    ctx.body = result;
  }
  async getAllPurchaseCount(ctx, next) {
    const result = await purchaseService.getAllDrugPurchaseCount();
    ctx.body = result;
  }
}
module.exports = new AnalysisController();