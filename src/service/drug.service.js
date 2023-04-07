const CommonService = require("./common.service");

class DrugService extends CommonService { 
  constructor() {
    super("drug_info");
  }
}
module.exports = new DrugService();