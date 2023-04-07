const CommonController = require("./common.controller");

class ReserveController extends CommonController { 
  constructor() {
    const fieldList = ["id", "drugId"];
    super("reserve", fieldList);
  }
}
module.exports = new ReserveController();