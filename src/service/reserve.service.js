const CommonService = require("./common.service");

class ReserveService extends CommonService { 
  constructor() {
    super("reserve");
  }
  async getReserveInfo(drugId) {
    const statement = `
      SELECT * FROM reserve WHERE drugId = ?
    `
    const [ result ] = await connenct.excute(statement, [ drugId ]);
    return result;
  }
}
module.exports = new ReserveService();