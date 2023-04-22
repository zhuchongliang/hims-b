const fs = require("fs");
const CommonController = require("./common.controller");
const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const { AVATAR_PATH } = require("../constants/file-path");
const officeService = require("../service/office.service");
class user extends CommonController {
  constructor() {
    const fieldList = ["id", "name", "roleId", "enable"];
    super("user", fieldList);
  }
  async create(ctx, next) {
    const userInfo = ctx.request.body;
    await userService.create(userInfo, next);
    ctx.body = {
      message: "注册成功"
    };
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const { filename, mimetype } = await fileService.getAvatarInfo(userId);;
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${filename}`);
    ctx.response.set("content-type", mimetype)
  }
  async getUserInfo(ctx, next) {
    const { id } = ctx.user;
    const result = await userService.getUserById(id);
    const result1 = await officeService.getUserOffice(id);
    ctx.body = result1.length === 0 ? result[0] : { ...result[0], ...result1[0]};
  }
}
module.exports = new user();