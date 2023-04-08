const CommonService = require("./common.service");
const connection = require("../app/database");

class PurchaseService extends CommonService { 
  constructor() {
    super("purchase");
  }
  async getAllDrugPurchaseCount() {
    const statement = ` 
      SELECT p.drugId, name, sum(count) as count 
      FROM purchase p 
      LEFT JOIN drug_info d 
      ON p.drugId = d.id 
      WHERE status = 1
      GROUP BY drugId
    `;
    const [ result ] = await connection.execute(statement);
    return result;
  }
}
module.exports = new PurchaseService();