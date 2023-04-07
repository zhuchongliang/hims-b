const enterService = require("../service/Enter.service");
const CommonController = require("./common.controller");
class EnterController extends CommonController {
  constructor() {
    super("enter");
  }
  async getEnterInfo(ctx, next) {
    const { officeId } = ctx.params;
    const queryInfo = ctx.request.body;
    const result = await enterService.getEnterInfo(officeId, queryInfo);
    ctx.body = result;
  }
  async searchEnterInfo(ctx, next) {
    const { officeId } = ctx.params;
    const { queryInfo: searchInfo } = ctx.query;
    const queryInfo = ctx.request.body;
    const result = await enterService.searchEnterInfo(officeId, searchInfo, queryInfo);
    ctx.body = result;
  }
}
module.exports = new EnterController();