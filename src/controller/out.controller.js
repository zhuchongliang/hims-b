const enterService = require("../service/enter.service");
const CommonController = require("./common.controller");
class OutController extends CommonController {
  constructor() {
    const fieldList = ["id", "officeId", "drugId"];
    super("enter", fieldList);
  }
  async approveOutRequest(ctx, next) {
    const { id } = ctx.params;
    const itemInfo = ctx.request.body;
    const result = await enterService.updateTableItem(id, itemInfo);
    console.log(123);
    ctx.content = "调库申请已被批准"
    ctx.body = result;
    await next();
  }
}
module.exports = new OutController();