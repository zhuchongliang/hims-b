const errorTypes = require("../constants/error-type");

const errorHandle = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;//错误请求
      message = '用户名或者密码不能为空';
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;//conflict 请求冲突
      message = '用户名已经存在';
      break;
    case errorTypes.USER_NOT_EXISTS:
      status = 400;//请求参数不正确
      message = "用户不存在";
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400;
      message = "密码输入错误";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "无效的token";
      break;
    case errorTypes.UNPERMISSION:
      status = 403;
      message = "不具备操作权限";
      break;
    case errorTypes.USER_IS_DISENABLE:
      status = 403;
      message = "用户已被禁用";
      break;
    case errorTypes.STOCK_IS_NOT_ENOUGH:
      status = 503;
      message = "药房库存不足";
      break;
    case errorTypes.RESERVE_IS_NOT_ENOUGH:
      status = 503;
      message = "药库库存不足";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = message;
}
module.exports = errorHandle;