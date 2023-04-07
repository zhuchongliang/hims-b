const prescriptionService = require("../service/prescription.service");
const CommonController = require("./common.controller");
class PrescriptionController extends CommonController {
  constructor() {
    super("prescription");
  }
  async getPrescriptionInfo(ctx, next) {
    const { officeId } = ctx.params;
    const queryInfo = ctx.request.body;
    const result = await prescriptionService.getPrescriptionInfo(officeId, queryInfo);
    ctx.body = result;
  }
  async searchPrescriptionInfo(ctx, next) {
    const { officeId } = ctx.params;
    const { queryInfo: searchInfo } = ctx.query;
    const queryInfo = ctx.request.body;
    const result = await prescriptionService.searchPrescriptionInfo(officeId, searchInfo, queryInfo);
    ctx.body = result;
  }
}
module.exports = new PrescriptionController();