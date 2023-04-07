const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const roleController = require("../controller/role.controller");
const { 
  deleteRoleMenuList,
  createRoleMenuList 
} = require("../middleware/authority.middware")
const roleRouter = new Router({
  prefix: "/role"
})
roleRouter.post("/", verifyAuth, roleController.createRoleAndMenuList);
roleRouter.post("/list", verifyAuth, roleController.getRoleList);
roleRouter.get("/:roleId/menu", verifyAuth, roleController.getMenuForRole)
roleRouter.post("/search", verifyAuth, roleController.searchRoleList);
roleRouter.delete("/:id", verifyAuth, deleteRoleMenuList, roleController.deletePageItem.bind(roleController));
roleRouter.delete("/", verifyAuth, deleteRoleMenuList, roleController.deletePageList.bind(roleController)),
roleRouter.patch("/:id", verifyAuth, deleteRoleMenuList, createRoleMenuList, roleController.updatePageItem.bind(roleController)),
module.exports = roleRouter;
