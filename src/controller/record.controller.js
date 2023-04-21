const recordService = require("../service/record.service");
class RecordController { 
  async getRecordList(ctx) {
    const userId = ctx.user.id;
    const result = await recordService.getRecordList(userId);
    ctx.body = result;
  }
}
module.exports = new RecordController();