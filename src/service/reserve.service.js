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
  async getDrugCountAmount() {
    const statement = `SELECT sum(count) as number FROM reserve`
    const [ result ] = await connection.execute(statement);
    return result;
  }
}
module.exports = new ReserveService();