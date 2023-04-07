const menuService = require("../service/menu.service");
const CommonController = require("./common.controller");
class MenuController extends CommonController {
  constructor() {
    const fieldList = ["id", "name", "url"];
    super("menu", fieldList);
  }
  async getMenuItemName(ctx, next) {
    const { url } = ctx.query;
    const result = await menuService.getMenuItemNameByUrl(url);
    ctx.body = result;
  }
  async getMenuListAll(ctx, next) {
    const result = await menuService.getMenuListAll();
    ctx.body = result;
  }
}
module.exports = new MenuController();