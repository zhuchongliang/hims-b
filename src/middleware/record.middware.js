const recordService = require("../service/record.service");

const createRecord = async (ctx, next) => {
  const userId = ctx.user.id;
  const content = ctx.content;
  await recordService.createRecord(userId, content);
}

module.exports = {
  createRecord
}