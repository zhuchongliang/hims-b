const reserveService = require("../service/reserve.service");

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

module.exports = { 
  addReserve
}