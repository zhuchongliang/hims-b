const stockService = require("../service/stock.service");
const CommonController = require("./common.controller");
class MenuController extends CommonController {
  constructor() {
    super("stock");
  }
  async getStockInfo(ctx, next) {
    const { officeId } = ctx.params;
    const queryInfo = ctx.request.body;
    const result = await stockService.getStockInfo(officeId, queryInfo);
    ctx.body = result;
  }
  async searchStockInfo(ctx, next) {
    const { officeId } = ctx.params;
    const { queryInfo: searchInfo } = ctx.query;
    const queryInfo = ctx.request.body;
    const result = await stockService.searchStockInfo(officeId, searchInfo, queryInfo);
    ctx.body = result;
  }
}
module.exports = new MenuController();