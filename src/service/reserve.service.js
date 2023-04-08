const CommonService = require("./common.service");
const connection = require("../app/database");
class ReserveService extends CommonService { 
  constructor() {
    super("reserve");
  }
  async getReserveInfo(drugId) {
    const statement = `
      SELECT * FROM reserve WHERE drugId = ?
    `
    const [ result ] = await connection.execute(statement, [ drugId + "" ]);
    return result;
  }
}
module.exports = new ReserveService();