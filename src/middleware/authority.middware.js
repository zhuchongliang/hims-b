const roleService = require("../service/role.service")
const authorityService = require("../service/authority.service")
async function deleteRoleMenuList(ctx, next) {
  let { id } = ctx.params;
  if (id === undefined) {
    id = ctx.request.body.idList;
  }
  await authorityService.deleteRoleAuthority(Array.isArray(id) ? id : [ id ]);
  await next();
}
async function createRoleMenuList(ctx, next) {
  const { id } = ctx.params;
  const { menuList, name, intro } = ctx.request.body;
  await authorityService.createRoleAuthority(id, menuList);
  ctx.request.body = {
    name,
    intro
  }
  await next();
}
module.exports = {
  deleteRoleMenuList,
  createRoleMenuList
}