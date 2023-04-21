const reserveService = require("../service/reserve.service");
const errorTypes = require("../constants/error-type");

const addReserve = async (ctx, next) => {
  const { drugId, count } = ctx.request.body;
  const result = await reserveService.getReserveInfo(drugId); 
  if (!result.length) {
    await reserveService.createTableItem({ drugId, count });
  } else {
    await reserveService.updateTableItem(result[0].id, { count: result[0].count +  count });
  }
  await next();
}
const verifyReserve = async (ctx, next) => {
  const  { officeId, drugId, count } = ctx.request.body
  const result = await reserveService.getReserveInfo(drugId);
  if (!result.length || result[0].count < count) {
    const error = new Error(errorTypes.RESERVE_IS_NOT_ENOUGH);
    return ctx.app.emit("error", error, ctx);
  } 
  await reserveService.updateTableItem(result[0].id, {
    count: (result[0].count - count)
  })
  await next();
}

module.exports = { 
  addReserve,
  verifyReserve
}