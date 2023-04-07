const CommonController = require("./common.controller");

class PurchaseController extends CommonController { 
  constructor() {
    const fieldList = ["id", "drugId"];
    super("purchase", fieldList);
  }
}
module.exports = new PurchaseController();