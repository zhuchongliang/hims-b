const CommonController = require("./common.controller");
class DrugController extends CommonController {
  constructor() {
    const fieldList = ["id", "name", "intro", "producer"];
    super("drug", fieldList);
  }
}
module.exports = new DrugController();