const stockService = require("../service/stock.service");
const errorTypes = require("../constants/error-type");

const verifyStock = async (ctx, next) => {
  const  { officeId, drugId, count } = ctx.request.body
  const result = await stockService.getDurgStockInfo(officeId, drugId);
  if (!result.length || result[0].drugCount < count) {
    const error = new Error(errorTypes.STOCK_IS_NOT_ENOUGH);
    return ctx.app.emit("error", error, ctx);
  } 
  await stockService.updateTableItem(result[0].id, {
    drugCount: (result[0].drugCount - count)
  })
  await next();
}

const addStock = async (ctx, next) => {
  const { officeId, drugId, count } = ctx.request.body;
  const result = await stockService.getDurgStockInfo(officeId, drugId);
  if (!result.length) {
    await stockService.createTableItem({ officeId, drugId, drugCount: count });
  } else {
    await stockService.updateTableItem(result[0].id, { drugCount: count + result[0].drugCount})
  }
  await next();
}

module.exports = { 
  verifyStock,
  addStock
}