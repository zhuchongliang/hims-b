const reserveService = require("../service/reserve.service");

const addReserve = async (ctx, next) => {
  const { drugId, count } = ctx.request.body;
  const result = await reserveService.getReserveInfo(drugId);
  if (!result.length) {
    await reserveService.createTableItem({ drugId, count });
  } else {
    await reserveService.updateTableItem(result.id, { count });
  }
  await next();
}

module.exports = { 
  addReserve
}