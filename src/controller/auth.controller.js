const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class autoContoller {
  async login(ctx, next) {
    const { id, name, roleId, officeId } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    });
    ctx.body = {
      id,
      name,
      roleId,
      officeId,
      token
    };
  }
  async success(ctx, next) {
    ctx.body = "验证成功";
  }
}
module.exports = new autoContoller();