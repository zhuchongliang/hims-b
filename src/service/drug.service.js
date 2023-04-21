const connection = require("../app/database");
const CommonService = require("./common.service");

class DrugService extends CommonService { 
  constructor() {
    super("drug_info");
  }
  async getDrugTypeAmount() {
    const statement = `SELECT count(*) as number FROM drug_info`
    const [ result ] = await connection.execute(statement);
    return result;
  }
}
module.exports = new DrugService();