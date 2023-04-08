const errorTypes = require("../constants/error-type");
const { getUserByName, getUserById } = require("../service/user.service");
const { checkResource } = require("../service/auth.service");
const { getUserOffice} = require("../service/office.service");
const md5password = require("../utils/password-handle");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY, PRIVATE_KEY } = require("../app/config");
const app = require("../app");
async function verifyLogin(ctx, next) {
  const { name, pwd } = ctx.request.body;
  //判断用户名密码是否为空
  if (!name || !pwd) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", error, ctx);
  }
  const result = await getUserByName(name);
  //判断用户是否存在
  if (!result.length) {
    const error = new Error(errorTypes.USER_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户是否已被禁用
  if(!result[0].enable) {
     const error = new Error(errorTypes.USER_IS_DISENABLE)
     return ctx.app.emit("error", error, ctx);
  }
  //密码检验
  if (result[0].pwd != md5password(pwd)) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = result[0];
  //获取用户的药房id
  const office = await getUserOffice(ctx.user.id);
  if (office.length) {
    ctx.user.officeId = office[0].officeId; 
  }
  await next();
}
//验证token
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  //没有携带token
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result;
    const userInfo = await getUserById(result.id);
   //判断用户是否存在
    if (!userInfo.length) {
      const error = new Error(errorTypes.USER_NOT_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }

    //判断用户是否已被禁用
    if(!userInfo[0].enable) {
      const error = new Error(errorTypes.USER_IS_DISENABLE)
      return ctx.app.emit("error", error, ctx);
    }
  }
  catch (err) {
    //错误的token
    console.log(err);
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit("error", error, ctx);
  }
  await next();
}
const verifyPermission = (resourceType) => {
  return async function (ctx, next) {
    const userId = ctx.user.id;
    const id = ctx.params[resourceType + "Id"];
    const result = await checkResource(id, userId, resourceType);
    if (!result) {
      const error = new Error(errorTypes.UNPERMISSION);
      return ctx.app.emit("error", error, ctx);
    }
    await next();
  }
}
module.exports = { verifyLogin, verifyAuth, verifyPermission };