const errorTypes = require("../constants/error-type");
const { getUserByName } = require("../service/user.service")
const md5password = require('../utils/password-handle');
async function vertifyUser(ctx, next) {
  const { name, pwd } = ctx.request.body;
  if (!name || !pwd) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  const result = await getUserByName(name);
  if (result.length != 0) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit("error", error, ctx);
  }
  await next();
}
async function handlePassword(ctx, next) {
  if (ctx.request.body.pwd) {
    ctx.request.body.pwd = md5password(ctx.request.body.pwd);
  }
  await next();
}
module.exports = { vertifyUser, handlePassword };