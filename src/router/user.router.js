const Router = require("koa-router");
const { vertifyUser, handlePassword } = require("../middleware/user.middleware");
const { create, avatarInfo } = require("../controller/user.controller");
const { verifyAuth } = require("../middleware/auth.middleware");
const userController = require("../controller/user.controller");
const userRouter = new Router({
  prefix: "/user"
})
userRouter.post("/", vertifyUser, handlePassword, create);
userRouter.post("/list", verifyAuth, userController.getPageList.bind(userController));
userRouter.get("/:userId/avatar", avatarInfo);
userRouter.get("/info", verifyAuth, userController.getUserInfo);
userRouter.post("/search", verifyAuth, userController.searchPageList.bind(userController));
userRouter.delete("/:id", verifyAuth, userController.deletePageItem.bind(userController));
userRouter.delete("/", verifyAuth, userController.deletePageList.bind(userController)),
userRouter.patch("/:id", verifyAuth, handlePassword, userController.updatePageItem.bind(userController)),
module.exports = userRouter;