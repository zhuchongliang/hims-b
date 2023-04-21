const prescriptionService = require("../service/prescription.service");
const purchaseService = require("../service/purchase.service");
const reserveService = require("../service/reserve.service");
const officeService = require("../service/office.service");
const userService = require("../service/user.service");
const drugService = require("../service/drug.service");
class AnalysisController {
  async getAllDrugUseCount(ctx, next) {
    const result = await prescriptionService.getAllDrugUseCount();
    ctx.body = result;
  }
  async getAllPurchaseCount(ctx, next) {
    const result = await purchaseService.getAllDrugPurchaseCount();
    ctx.body = result;
  }
  async getTopPanelData(ctx, next) {
    const [ number ]  = await reserveService.getDrugCountAmount();
    number.title = "药库总库存"
    number.iconName = "reserve"
    number.number = parseInt(number.number);
    const [ number1 ]  = await officeService.getDrugOfiiceAmount();
    number1.title = "药房总数量"
    number1.iconName = "office"
    const [ number2 ] = await userService.getUserAmount();
    number2.title = "用户总数量"
    number2.iconName = "user"
    const [ number3 ] = await drugService.getDrugTypeAmount();
    number3.title = "药品种类数"
    number3.iconName = "drug"
    ctx.body = [number2, number1, number3, number];
  }
}
module.exports = new AnalysisController();