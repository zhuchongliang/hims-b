const enterService = require("../service/enter.service");
const CommonController = require("./common.controller");
const officeService = require("../service/office.service");
class OutController extends CommonController {
  constructor() {
    const fieldList = ["id", "officeId", "drugId"];
    super("enter", fieldList);
  }
  async approveOutRequest(ctx, next) {
    const { id } = ctx.params;
    const itemInfo = ctx.request.body;
    const result = await enterService.updateTableItem(id, itemInfo);
    ctx.content = "调库申请已被批准"
    const [{ userId }] = await officeService.getOfficeOwner(itemInfo.officeId);
    ctx.user.id = userId;
    ctx.body = result;
    await next();
  }
}
module.exports = new OutController();