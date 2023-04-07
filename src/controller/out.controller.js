const enterService = require("../service/enter.service");
const CommonController = require("./common.controller");
class OutController extends CommonController {
  constructor() {
    const fieldList = ["id", "officeId", "drugId"];
    super("enter", fieldList);
  }
}
module.exports = new OutController();