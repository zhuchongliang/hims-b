const CommonService = require("./common.service");

class PurchaseService extends CommonService { 
  constructor() {
    super("purchase");
  }
}
module.exports = new PurchaseService();