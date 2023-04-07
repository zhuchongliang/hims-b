const roleService = require("../service/role.service")
const authorityService = require("../service/authority.service")
const CommonController = require("./common.controller")
class RoleController extends CommonController {
  constructor() {
    const fieldList = ["id", "name", "intro"];
    super("role", fieldList);
  }
  async getMenuForRole(ctx, next) {
    const { roleId } = ctx.params;
    const [ result ] = await authorityService.getMenuList(roleId);
    ctx.body = result;
  }
  async getRoleList(ctx, next) {
   const queryInfo = ctx.request.body;
   const result = await roleService.getRoleList(queryInfo);
   ctx.body = result;
  }
  async searchRoleList(ctx, next) {
    const queryInfo = ctx.request.body;
    const searchInfo = ctx.query.queryInfo;
    const result = await roleService.searchRoleList(searchInfo, queryInfo);
    ctx.body = result;
  }
  async createRoleAndMenuList(ctx, next) {
    const { name, intro, menuList } = ctx.request.body;
    const { insertId } = await roleService.createTableItem({ name, intro})
    const result = await authorityService.createRoleAuthority(insertId, menuList);
    ctx.body = result;
  }
}
module.exports = new RoleController();