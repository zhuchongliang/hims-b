const officeService = require("../service/office.service");
const CommonController = require("./common.controller");
class OfficeController extends CommonController {
  constructor() {
    const fieldList = ["id", "owner", "position"];
    super("office", fieldList);
  }
}
module.exports = new OfficeController();