const { APP_HOST, APP_PORT } = require("../app/config");
const service = require("../service/file.service");
const userService = require("../service/user.service");
class FileController {
  async saveAvatarInfo(ctx, next) {
    const avatar = ctx.req.file;
    const userId = ctx.user.id
    //创建用户头像信息记录
    await service.createAvatar(avatar, userId);
    //将头像url保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`
    const result = await userService.updateAvatarUrlById(userId, avatarUrl);
    ctx.body = avatarUrl;
  }
}
module.exports = new FileController();